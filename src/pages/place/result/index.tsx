import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  MIN_DEPARTURES,
  type MeetingType,
  type MiddlePointRequest,
  type StationScore,
  describeMiddlePointError,
} from '@/api/create-meeting/middle-point';
import type { PlaceSearchType } from '@/api/create-meeting/place';
import { useMiddlePoint } from '@/api/query/create-meeting';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { cx } from '@/ui/utils';

import { loadMidpoint, loadStartInfos, saveSelectedPlaces } from '../guest-session';
import { normalizePlaceName } from '../midpoint-calc';
import { useCarousel } from '../use-carousel';

import * as styles from '../page.css';

/** 화면의 카테고리 칩 ↔ API의 meeting_type (서버에서 Kakao 카테고리 코드로 매핑된다) */
const CATEGORIES: { label: string; type: MeetingType }[] = [
  { label: '맛집', type: '맛집' },
  { label: '카페', type: '카페' },
  { label: '문화생활', type: '문화' },
];

const MAX_SELECT = 3;

/** 경로 조회에 실패한 구간은 -1로 내려온다. */
const NO_ROUTE = -1;

const formatMinutes = (minutes: number | null) =>
  minutes === null || minutes < 0 ? '조회 불가' : `${Math.round(minutes)}분`;

/** 후보 장소를 다음 단계(공유 화면)가 쓰는 형태로 옮긴다. */
const toSelectedPlace = (candidate: StationScore): PlaceSearchType => ({
  id: candidate.url || `${candidate.name}-${candidate.address}`,
  name: normalizePlaceName(candidate.name),
  address: candidate.address,
  comment:
    candidate.max_time === null
      ? '모두의 중간위치 근처'
      : `모두 ${candidate.max_time}분 안에 도착할 수 있어요`,
});

export const GuestResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') ?? 'share';

  const midpoint = loadMidpoint();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // 앞 단계에서 모아둔 참여자 출발지. 이 값이 있어야 카테고리별로 다시 추천받을 수 있다.
  const startInfos = useMemo(() => loadStartInfos(), []);

  const request = useMemo<MiddlePointRequest | null>(
    () =>
      startInfos.length >= MIN_DEPARTURES
        ? { meeting_type: activeCategory.type, user_start_infos: startInfos }
        : null,
    [startInfos, activeCategory],
  );

  const { data, error, isPending, isError, isFetching, refetch } = useMiddlePoint(request);

  // 추천 1순위가 candidates 맨 앞이라 목록만 그리면 되지만, 배지를 붙이려고 따로 본다
  const candidates = data?.candidates ?? [];
  const recommendedId = data ? toSelectedPlace(data.recommended_station).id : '';

  const { containerRef, activeIndex, onScroll, scrollToIndex, dragHandlers } = useCarousel(
    candidates.length,
  );

  const handleCategoryChange = (category: (typeof CATEGORIES)[number]) => {
    if (category.type === activeCategory.type) return;
    setActiveCategory(category);
  };

  const toggleSelect = (place: PlaceSearchType) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(place.id)) {
        next.delete(place.id);
      } else if (next.size < MAX_SELECT) {
        next.add(place.id);
      }
      return next;
    });
  };

  const selectedPlaces = candidates.map(toSelectedPlace).filter((place) => selected.has(place.id));

  const handleShare = () => {
    if (selectedPlaces.length === 0) return;
    saveSelectedPlaces(selectedPlaces);
    navigate('/place/share-complete');
  };

  const backPath = from === 'direct' ? '/place/midpoint' : '/place/status';

  const renderCandidates = () => {
    if (!request) {
      return (
        <div className={styles.loadingBox}>
          <div className={styles.errorIcon}>!</div>
          <p className={styles.loadingText}>출발지를 먼저 알려주세요</p>
          <p className={styles.loadingSubText}>
            모임장소를 추천하려면 출발지가 {MIN_DEPARTURES}곳 이상 필요해요
          </p>
          <div className={styles.errorAction}>
            <button className={styles.outlineButton} onClick={() => navigate('/place')}>
              출발지 입력하러 가기
            </button>
          </div>
        </div>
      );
    }

    if (isPending || isFetching) {
      return (
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>만나기 좋은 {activeCategory.label}을 찾고 있어요</p>
          <p className={styles.loadingSubText}>
            {startInfos.length}명의 대중교통 소요시간을 계산하고 있어요
          </p>
        </div>
      );
    }

    if (isError || candidates.length === 0) {
      const message = isError
        ? describeMiddlePointError(error)
        : {
            title: '추천할 장소를 찾지 못했어요',
            description: '다른 카테고리로 다시 찾아보세요',
          };

      return (
        <div className={styles.loadingBox}>
          <div className={styles.errorIcon}>!</div>
          <p className={styles.loadingText}>{message.title}</p>
          <p className={styles.loadingSubText}>{message.description}</p>
          <div className={styles.errorAction}>
            <button className={styles.outlineButton} onClick={() => refetch()}>
              다시 시도하기
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div
          ref={containerRef}
          className={styles.placeCarousel}
          onScroll={onScroll}
          {...dragHandlers}
        >
          {candidates.map((candidate, index) => {
            const place = toSelectedPlace(candidate);
            const isSelected = selected.has(place.id);

            return (
              <div
                key={place.id}
                className={cx(styles.placeSlide, isSelected && styles.placeSlideSelected)}
              >
                <div className={styles.placeSlideTop}>
                  <span className={styles.placeName}>{place.name}</span>
                  <span className={styles.placeIndexBadge}>
                    {index + 1}/{candidates.length}
                  </span>
                </div>
                <span className={styles.placeMeta}>{candidate.address}</span>
                <span className={styles.placeMeta}>
                  중간지점에서 {candidate.distance_m}m · 평균 {formatMinutes(candidate.avg_time)}
                </span>

                <div className={styles.travelChipRow}>
                  {startInfos.map((info, i) => (
                    <span key={info.user_seq} className={styles.travelChip}>
                      {info.user_nickname}{' '}
                      {candidate.travel_times[i] === NO_ROUTE
                        ? '조회 불가'
                        : `${candidate.travel_times[i]}분`}
                      {candidate.estimated_mask?.[i] && ' (추정)'}
                    </span>
                  ))}
                </div>

                <span className={styles.placeReason}>
                  {place.id === recommendedId ? '👑 가장 공평한 곳 · ' : ''}
                  {place.comment}
                </span>

                <div className={styles.placeActions}>
                  <a
                    className={styles.placeActionButton}
                    href={candidate.url}
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
                    onClick={() => toggleSelect(place)}
                  >
                    {isSelected ? '✓ 선택됨' : '선택하기'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.dotRow}>
          {candidates.map((candidate, index) => (
            <button
              key={candidate.url || candidate.name}
              type="button"
              aria-label={`${index + 1}번째 장소로 이동`}
              className={cx(styles.dot, index === activeIndex && styles.dotActive)}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>

        {data?.warnings?.map((warning) => (
          <div key={warning} className={styles.noticeBoxGrey} style={{ marginTop: 10 }}>
            {warning}
          </div>
        ))}

        <button
          className={styles.outlineButton}
          style={{ marginTop: 12 }}
          onClick={() => refetch()}
        >
          ↻ 다시 추천받기
        </button>
      </>
    );
  };

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
                      onClick={() => toggleSelect(place)}
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
          {midpoint ? `${midpoint} 근처에서 만나기` : '모두의 중간위치에서 만나기'}
          <br />
          좋은 곳을 추천해 드려요!
        </h2>
        <p className={styles.helperText} style={{ marginBottom: 16 }}>
          마음에 드는 곳을 골라 공유해 보세요 (최대 {MAX_SELECT}곳)
        </p>

        <div className={styles.chipRow}>
          {CATEGORIES.map((category) => (
            <button
              key={category.type}
              className={cx(
                styles.chip,
                activeCategory.type === category.type && styles.chipActive,
              )}
              onClick={() => handleCategoryChange(category)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {renderCandidates()}
      </div>
    </PageLayout>
  );
};
