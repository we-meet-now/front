import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { type PlaceSearchType, fetchSearchPlaces } from '@/api/create-meeting/place';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { cx } from '@/ui/utils';

import { loadMidpoint, saveSelectedPlaces } from '../guest-session';
import { buildNaverMapUrl, enrichPlace } from '../place-detail';
import { useCarousel } from '../use-carousel';

import * as styles from '../page.css';

const CATEGORIES = ['맛집', '카페', '문화생활'] as const;
type Category = (typeof CATEGORIES)[number];

const MAX_SELECT = 3;

type Status = 'loading' | 'error' | 'success';

export const GuestResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') ?? 'share';

  const midpoint = loadMidpoint() || '강남역';
  const [activeCategory, setActiveCategory] = useState<Category>('맛집');
  const [places, setPlaces] = useState<PlaceSearchType[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // 재조회 트리거. 값이 바뀔 때마다 아래 이펙트가 다시 실행된다.
  const [reloadKey, setReloadKey] = useState(0);
  // 카테고리를 연달아 누를 때 느린 응답이 최신 결과를 덮어쓰지 않도록
  const reqId = useRef(0);

  useEffect(() => {
    const myReq = ++reqId.current;

    fetchSearchPlaces({ loc: `${midpoint} ${activeCategory}` })
      .then((result) => {
        if (myReq !== reqId.current) return;
        setPlaces(result);
        setStatus(result.length > 0 ? 'success' : 'error');
      })
      .catch(() => {
        if (myReq !== reqId.current) return;
        setPlaces([]);
        setStatus('error');
      });
  }, [activeCategory, midpoint, reloadKey]);

  // 로딩 표시는 이펙트가 아니라 사용자 조작 시점에 켠다
  const handleCategoryChange = (category: Category) => {
    if (category === activeCategory) return;
    setStatus('loading');
    setActiveCategory(category);
  };

  const handleRetry = () => {
    setStatus('loading');
    setReloadKey((key) => key + 1);
  };

  const details = useMemo(
    () =>
      places.map((place) => enrichPlace(place, { category: activeCategory, station: midpoint })),
    [places, activeCategory, midpoint],
  );

  const { containerRef, activeIndex, onScroll, scrollToIndex, dragHandlers } = useCarousel(
    details.length,
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_SELECT) {
        next.add(id);
      }
      return next;
    });
  };

  const selectedPlaces = details.filter((place) => selected.has(place.id));

  const handleShare = () => {
    if (selectedPlaces.length === 0) return;
    saveSelectedPlaces(selectedPlaces);
    navigate('/place/share-complete');
  };

  const backPath = from === 'direct' ? '/place/midpoint' : '/place/status';

  return (
    <PageLayout
      header={
        <AppBar title="모임장소 정하기" showBackButton onBackClick={() => navigate(backPath)} />
      }
      footer={
        <div className={styles.footer}>
          {selectedPlaces.length > 0 && (
            <>
              <span className={styles.caption} style={{ textAlign: 'left' }}>
                선택한 장소 {selectedPlaces.length}곳
              </span>
              <div className={styles.selectedChips}>
                {selectedPlaces.map((place) => (
                  <span key={place.id} className={styles.selectedChipItem}>
                    {place.name}
                    <button
                      className={styles.selectedChipRemove}
                      onClick={() => toggleSelect(place.id)}
                      aria-label={`${place.name} 선택 해제`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </>
          )}
          <button
            className={styles.primaryButton}
            disabled={selectedPlaces.length === 0}
            onClick={handleShare}
          >
            선택한 장소 공유하기{selectedPlaces.length > 0 && ` (${selectedPlaces.length})`}
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <h2 className={styles.pageTitle}>
          {midpoint} 근처에서 만나기
          <br />
          좋은 곳을 추천해 드려요!
        </h2>
        <p className={styles.helperText} style={{ marginBottom: 16 }}>
          마음에 드는 곳을 골라 공유해 보세요 (최대 {MAX_SELECT}곳)
        </p>

        <div className={styles.chipRow}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={cx(styles.chip, activeCategory === category && styles.chipActive)}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {status === 'loading' && (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>만나기 좋은 장소를 찾고 있어요</p>
            <p className={styles.loadingSubText}>모두의 중간위치를 기준으로 분석하고 있습니다</p>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.loadingBox}>
            <div className={styles.errorIcon}>!</div>
            <p className={styles.loadingText}>장소를 찾지 못했어요</p>
            <p className={styles.loadingSubText}>다시 한 번 시도해 주세요</p>
            <div className={styles.errorAction}>
              <button className={styles.outlineButton} onClick={handleRetry}>
                다시 시도하기
              </button>
            </div>
          </div>
        )}

        {status === 'success' && (
          <>
            <div
              ref={containerRef}
              className={styles.placeCarousel}
              onScroll={onScroll}
              {...dragHandlers}
            >
              {details.map((place, index) => {
                const isSelected = selected.has(place.id);

                return (
                  <div
                    key={place.id}
                    className={cx(styles.placeSlide, isSelected && styles.placeSlideSelected)}
                  >
                    <div className={styles.placeSlideTop}>
                      <span className={styles.placeName}>{place.name}</span>
                      <span className={styles.placeIndexBadge}>
                        {index + 1}/{details.length}
                      </span>
                    </div>
                    <span className={styles.placeMeta}>
                      {place.category} · {place.stationExit} 도보 {place.walkingMinutes}분
                    </span>
                    <span className={styles.placeRatingRow}>
                      ★ {place.rating.toFixed(1)}
                      <span style={{ color: '#9BA7B5' }}>(리뷰 {place.reviewCount})</span>
                    </span>
                    <span className={styles.placeReason}>{place.comment}</span>

                    <div className={styles.placeActions}>
                      <a
                        className={styles.placeActionButton}
                        href={buildNaverMapUrl(place)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        자세히 보기
                      </a>
                      <button
                        className={cx(
                          styles.placeActionButton,
                          isSelected && styles.placeActionButtonActive,
                        )}
                        onClick={() => toggleSelect(place.id)}
                      >
                        {isSelected ? '✓ 선택됨' : '선택하기'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.dotRow}>
              {details.map((place, index) => (
                <button
                  key={place.id}
                  type="button"
                  aria-label={`${index + 1}번째 장소로 이동`}
                  className={cx(styles.dot, index === activeIndex && styles.dotActive)}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>

            <button
              className={styles.outlineButton}
              style={{ marginTop: 12 }}
              onClick={handleRetry}
            >
              ↻ 다른 장소 더 추천받기
            </button>
          </>
        )}
      </div>
    </PageLayout>
  );
};
