import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { findNearestAddress } from '@/api/create-meeting/address';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { ShareSheet } from '@/ui/share-sheet/share-sheet';
import { Toast } from '@/ui/toast/toast';
import { cx } from '@/ui/utils';

import { type DeparturePoint, loadDeparturePoints, saveMidpoint } from '../guest-session';
import {
  type GeoPoint,
  computeCentroid,
  distanceKm,
  estimateTransitMinutes,
  toBoxPosition,
} from '../midpoint-calc';

import * as styles from '../page.css';

const SHARE_URL = 'wemeettalk.com/meet/abc123/midpoint';

type Status = 'loading' | 'error' | 'success';

type TravelResult = {
  id: string;
  label: string;
  minutes: number;
  position: { left: string; top: string };
};

type Computed = {
  midpoint: string;
  center: GeoPoint;
  results: TravelResult[];
};

const hasCoords = (p: DeparturePoint): p is DeparturePoint & GeoPoint =>
  typeof p.lat === 'number' && typeof p.lng === 'number';

export const GuestMidpointPage = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>('loading');
  const [computed, setComputed] = useState<Computed | null>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const compute = useCallback(() => {
    // 재시도를 연달아 눌러도 타이머가 겹치지 않도록 이전 것을 정리한다
    if (timerRef.current) clearTimeout(timerRef.current);

    // 실제 중간위치 산출 API가 없어 로딩 연출만 준다
    timerRef.current = setTimeout(() => {
      const points = loadDeparturePoints().filter(hasCoords);

      // 세션이 비었거나 직접 URL로 들어온 경우 — 실제로 도달 가능한 실패 경로
      if (points.length < 2) {
        setStatus('error');
        return;
      }

      const center = computeCentroid(points);
      const midpoint = findNearestAddress(center.lat, center.lng).name;

      setComputed({
        midpoint,
        center,
        results: points.map((point) => ({
          id: point.id,
          label: point.address,
          minutes: estimateTransitMinutes(distanceKm(point, center)),
          position: toBoxPosition(point, points),
        })),
      });
      saveMidpoint(midpoint);
      setStatus('success');
    }, 1500);
  }, []);

  useEffect(() => {
    compute();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [compute]);

  const handleRetry = () => {
    setStatus('loading');
    compute();
  };

  const renderBody = () => {
    if (status === 'loading') {
      return (
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>중간위치를 찾고 있어요</p>
          <p className={styles.loadingSubText}>입력한 출발지를 분석하고 있어요</p>
        </div>
      );
    }

    if (status === 'error' || !computed) {
      return (
        <div className={styles.loadingBox}>
          <div className={styles.errorIcon}>!</div>
          <p className={styles.loadingText}>위치를 찾지 못했어요</p>
          <p className={styles.loadingSubText}>다시 한 번 시도해 주세요</p>
          <div className={styles.errorAction}>
            <button className={styles.outlineButton} onClick={handleRetry}>
              다시 시도하기
            </button>
          </div>
        </div>
      );
    }

    const { midpoint, results } = computed;
    const minutes = results.map((r) => r.minutes);

    return (
      <>
        <h2 className={styles.pageTitle}>중간위치는 {midpoint} 근처예요</h2>
        <p className={styles.helperText} style={{ marginBottom: 16 }}>
          {results.length}명의 출발지를 기준으로 찾았어요
        </p>

        <div className={styles.mockMap}>
          {results.map((result) => (
            <div key={result.id} className={styles.mapMiniPin} style={result.position} />
          ))}
          <div className={styles.mapPin}>
            <div className={styles.mapPinDot} />
            <span className={styles.mapPinLabel}>{midpoint}</span>
          </div>
        </div>

        <div className={styles.sectionTitle}>
          위치별 소요시간
          <span
            style={{
              fontSize: 11,
              color: '#868B94',
              fontWeight: 400,
              marginLeft: 6,
            }}
          >
            대중교통 기준
          </span>
        </div>

        {results.map((result, index) => (
          <div key={result.id} className={styles.travelRow}>
            <span className={styles.travelIndex}>{index + 1}</span>
            <span className={styles.travelName}>{result.label}</span>
            <span className={styles.travelTime}>{result.minutes}분</span>
          </div>
        ))}

        <div className={styles.noticeBoxGrey} style={{ marginTop: 14 }}>
          모두 {Math.min(...minutes)}~{Math.max(...minutes)}분 안에 도착할 수 있어요
        </div>

        <button
          className={styles.outlineButton}
          style={{ marginTop: 14 }}
          onClick={() => setSheetOpen(true)}
        >
          ⤴ 중간위치 공유하기
        </button>
      </>
    );
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
        status === 'success' && computed ? (
          <div className={styles.footer}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/place/result?from=direct')}
            >
              모임장소 추천받기
            </button>
            <span className={styles.caption}>
              {computed.midpoint} 근처에서 만나기 좋은 곳을 추천해 드려요!
            </span>
          </div>
        ) : undefined
      }
    >
      <div className={styles.body}>
        {/* 스텝 표시 */}
        <div className={styles.stepIndicator}>
          <div className={cx(styles.stepCircle, styles.stepCircleDone)}>✓</div>
          <div className={cx(styles.stepLine, styles.stepLineDone)} />
          <div className={cx(styles.stepCircle, styles.stepCircleActive)}>2</div>
        </div>
        <p className={styles.caption} style={{ marginTop: 8, marginBottom: 0 }}>
          중간위치 찾기 · 모임장소 추천
        </p>

        {renderBody()}
      </div>

      {isSheetOpen && computed && (
        <ShareSheet
          title="중간위치 공유하기"
          message={`[위밋톡] 모두를 위한 최적의 위치는? ${computed.midpoint} 근처예요!`}
          url={SHARE_URL}
          onClose={() => setSheetOpen(false)}
          onCopied={() => setToast('복사되었어요')}
          onCopyFailed={() => setToast('복사에 실패했어요')}
        />
      )}

      {toast && <Toast title={toast} onClose={() => setToast(null)} />}
    </PageLayout>
  );
};
