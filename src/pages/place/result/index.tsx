import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { fetchSearchPlaces, type PlaceSearchType } from '@/api/create-meeting/place';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from '../page.css';

const CATEGORIES = ['맛집', '카페', '문화생활'] as const;
type Category = (typeof CATEGORIES)[number];

export const GuestResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') ?? 'share';

  const midpoint = sessionStorage.getItem('guest_midpoint') ?? '강남역';
  const [activeCategory, setActiveCategory] = useState<Category>('맛집');
  const [places, setPlaces] = useState<PlaceSearchType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const loadPlaces = async (category: Category) => {
    setIsLoading(true);
    try {
      const result = await fetchSearchPlaces({ loc: `${midpoint} ${category}` });
      setPlaces(result);
    } catch {
      setPlaces([
        { id: '1', name: `${midpoint} 분위기 좋은 곳`, address: `${midpoint} 인근 · 도보 5분`, comment: '접근성 우수하고 모임하기 좋아요' },
        { id: '2', name: `${midpoint} 인기 맛집`, address: `${midpoint} 인근 · 도보 8분`, comment: '가성비 좋고 넓어서 단체 이용에 적합해요' },
        { id: '3', name: `${midpoint} 카페라운지`, address: `${midpoint} 인근 · 도보 3분`, comment: '조용하고 좌석이 많아요' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces(activeCategory);
  }, [activeCategory]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  const handleShare = () => {
    sessionStorage.setItem(
      'guest_selected_places',
      JSON.stringify(places.filter((p) => selected.has(p.id)).map((p) => p.name)),
    );
    navigate('/place/share-complete');
  };

  const backPath = from === 'direct' ? '/place/midpoint' : '/place/status';

  return (
    <PageLayout
      header={
        <AppBar
          title="모임장소 정하기"
          showBackButton
          onBackClick={() => navigate(backPath)}
        />
      }
      footer={
        <div className={styles.footer}>
          {selected.size > 0 && (
            <div className={styles.selectedChips}>
              {places
                .filter((p) => selected.has(p.id))
                .map((p) => (
                  <span key={p.id} className={styles.selectedChipItem}>
                    {p.name}
                  </span>
                ))}
            </div>
          )}
          <button
            className={styles.primaryButton}
            disabled={selected.size === 0}
            onClick={handleShare}
          >
            선택한 장소 공유하기
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.6px', lineHeight: 1.3, marginTop: 22, marginBottom: 4 }}>
          {midpoint} 근처에서 만나기<br />좋은 곳을 추천해 드려요!
        </h2>
        <p className={styles.helperText} style={{ marginBottom: 16 }}>
          마음에 드는 곳을 골라 공유해 보세요 (최대 3곳)
        </p>

        <div className={styles.chipRow}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.chip} ${activeCategory === cat ? styles.chipActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>AI가 장소를 찾고 있어요</p>
            <p className={styles.loadingSubText}>{midpoint} 인근 {activeCategory}를 탐색 중이에요</p>
          </div>
        ) : (
          <>
            {places.map((place) => (
              <div
                key={place.id}
                className={`${styles.placeCard} ${selected.has(place.id) ? styles.placeCardSelected : ''}`}
                onClick={() => toggleSelect(place.id)}
              >
                <div className={styles.placeName}>{place.name}</div>
                <div className={styles.placeMeta}>{place.address}</div>
                <span className={styles.placeReason}>{place.comment}</span>
              </div>
            ))}
            <button
              className={styles.outlineButton}
              style={{ marginTop: 4 }}
              onClick={() => loadPlaces(activeCategory)}
            >
              ↻ 다른 장소 더 추천받기
            </button>
          </>
        )}
      </div>
    </PageLayout>
  );
};
