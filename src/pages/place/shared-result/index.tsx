import { useNavigate } from 'react-router-dom';

import { type PlaceSearchType } from '@/api/create-meeting/place';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from '../page.css';

const PIN_POSITIONS = [
  { left: '34%', top: '38%' },
  { left: '66%', top: '34%' },
  { left: '50%', top: '68%' },
];

export const GuestSharedResultPage = () => {
  const navigate = useNavigate();

  const rawPlaces = sessionStorage.getItem('guest_selected_places');
  const places: PlaceSearchType[] = rawPlaces ? JSON.parse(rawPlaces) : [];
  const nickname = sessionStorage.getItem('guest_nickname') ?? '익명이';
  const midpoint = sessionStorage.getItem('guest_midpoint') ?? '강남역';

  return (
    <PageLayout
      header={
        <AppBar
          title="모임장소 정하기"
          showBackButton
          onBackClick={() => navigate('/place/share-complete')}
        />
      }
      footer={
        <div className={styles.footer}>
          <button className={styles.primaryButton} onClick={() => navigate('/place/status')}>
            나도 장소 골라보기
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '-0.6px',
            lineHeight: 1.3,
            marginTop: 22,
            marginBottom: 4,
          }}
        >
          {nickname}가 고른 곳이에요!
        </h2>
        <p className={styles.helperText} style={{ marginBottom: 16 }}>
          {midpoint} 근처 · 모두의 중간위치 기준
        </p>

        <div className={styles.mockMap}>
          {places.slice(0, PIN_POSITIONS.length).map((place, i) => (
            <div key={place.id} className={styles.mapNumberedPin} style={PIN_POSITIONS[i]}>
              {i + 1}
            </div>
          ))}
        </div>

        {places.map((place, i) => (
          <div key={place.id} className={styles.card}>
            <div className={styles.placeName}>
              {i + 1}. {place.name}
            </div>
            <div className={styles.placeMeta}>{place.address}</div>
            <span className={styles.placeReason}>{place.comment}</span>
          </div>
        ))}

        <p className={styles.caption} style={{ marginTop: 8 }}>
          나도 마음에 드는 곳을 골라볼까요?
        </p>
      </div>
    </PageLayout>
  );
};
