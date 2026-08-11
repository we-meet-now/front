import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from '../page.css';

type PointResult = {
  name: string;
  address: string;
  minutes: number;
};

export const GuestMidpointPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [midpoint] = useState('강남역');

  const rawPoints = sessionStorage.getItem('guest_direct_points');
  const points: { name: string; address: string }[] = rawPoints ? JSON.parse(rawPoints) : [];

  const results: PointResult[] = points
    .filter((p) => p.address.trim())
    .map((p, i) => ({
      name: p.name || `인원 ${i + 1}`,
      address: p.address,
      minutes: 18 + i * 11,
    }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('guest_midpoint', midpoint);
    }, 1800);
    return () => clearTimeout(timer);
  }, [midpoint]);

  const handleGetRecommendation = () => {
    navigate('/place/result?from=direct');
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(`중간위치: ${midpoint}\nwemeettalk.com/meet/abc123`)
      .catch(() => {});
  };

  return (
    <PageLayout
      header={
        <AppBar
          title="모임장소 정하기"
          showBackButton
          onBackClick={() => navigate('/place/direct')}
        />
      }
      footer={
        !isLoading ? (
          <div className={styles.footer}>
            <button className={styles.primaryButton} onClick={handleGetRecommendation}>
              모임장소 추천받기
            </button>
          </div>
        ) : undefined
      }
    >
      <div className={styles.body}>
        {/* 스텝 표시 */}
        <div className={styles.stepIndicator}>
          <div className={`${styles.stepCircle} ${styles.stepCircleDone}`}>✓</div>
          <div className={`${styles.stepLine} ${styles.stepLineDone}`} />
          <div className={`${styles.stepCircle} ${styles.stepCircleActive}`}>2</div>
        </div>
        <p className={styles.caption} style={{ marginTop: 8, marginBottom: 0 }}>
          중간위치 찾기 · 모임장소 추천
        </p>

        {isLoading ? (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>중간위치를 찾고 있어요</p>
            <p className={styles.loadingSubText}>입력한 출발지를 분석하고 있어요</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.6px', lineHeight: 1.3, marginTop: 20, marginBottom: 4 }}>
              중간위치는 {midpoint} 근처예요
            </h2>
            <p className={styles.helperText} style={{ marginBottom: 16 }}>
              분석 결과 모두에게 가장 공평한 위치예요
            </p>

            {/* 지도 목업 */}
            <div className={styles.mockMap}>
              <div className={styles.mapPin}>
                <div className={styles.mapPinDot} />
                <span className={styles.mapPinLabel}>{midpoint}</span>
              </div>
            </div>

            <div className={styles.sectionTitle}>
              위치별 소요시간
              <span style={{ fontSize: 11, color: '#868B94', fontWeight: 400, marginLeft: 6 }}>
                대중교통 기준
              </span>
            </div>

            {results.map((r) => (
              <div key={r.name} className={styles.travelRow}>
                <span className={styles.travelName}>{r.address || r.name}</span>
                <span className={styles.travelTime}>{r.minutes}분</span>
              </div>
            ))}

            <div className={styles.noticeBoxGrey} style={{ marginTop: 14 }}>
              모두 {Math.min(...results.map((r) => r.minutes))}~{Math.max(...results.map((r) => r.minutes))}분 안에 도착할 수 있어요
            </div>

            <button
              className={styles.outlineButton}
              style={{ marginTop: 14 }}
              onClick={handleShare}
            >
              중간위치 공유하기
            </button>
          </>
        )}
      </div>
    </PageLayout>
  );
};
