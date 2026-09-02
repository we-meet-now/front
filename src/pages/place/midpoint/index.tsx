import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MIN_DEPARTURES,
  type MiddlePointRequest,
  describeMiddlePointError,
} from '@/api/create-meeting/middle-point';
import { useMiddlePoint } from '@/api/query/create-meeting';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { ShareSheet } from '@/ui/share-sheet/share-sheet';
import { Toast } from '@/ui/toast/toast';
import { cx } from '@/ui/utils';

import {
  type DeparturePoint,
  loadDeparturePoints,
  saveMidpoint,
  saveStartInfos,
} from '../guest-session';
import { formatStationName, toBoxPosition } from '../midpoint-calc';

import * as styles from '../page.css';

const SHARE_URL = 'wemeettalk.com/meet/abc123/midpoint';

/** 중간위치 화면은 목적지 종류를 아직 고르기 전이라 기본값인 지하철역으로 찾는다. */
const MEETING_TYPE = '지하철' as const;

/** 세션에 저장된 출발지를 API 요청 형태로 바꾼다. 2곳 미만이면 호출할 수 없다. */
const buildRequest = (points: DeparturePoint[]): MiddlePointRequest | null => {
  const filled = points.filter((point) => point.address.trim());
  if (filled.length < MIN_DEPARTURES) return null;

  return {
    meeting_type: MEETING_TYPE,
    // user_seq 순서가 응답의 travel_times 인덱스와 그대로 대응된다
    user_start_infos: filled.map((point, index) => ({
      user_seq: String(index + 1),
      user_nickname: `참여자 ${index + 1}`,
      user_start_addr: point.address.trim(),
    })),
  };
};

export const GuestMidpointPage = () => {
  const navigate = useNavigate();

  const [isSheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // 세션 값은 화면 진입 시점에 한 번만 읽는다 (queryKey가 매 렌더 바뀌지 않도록)
  const request = useMemo(() => buildRequest(loadDeparturePoints()), []);
  const { data, error, isPending, isError, refetch } = useMiddlePoint(request);

  const station = data?.recommended_station;
  const midpointName = station ? formatStationName(station.name) : '';

  const results = useMemo(() => {
    if (!data || !request) return [];

    const coords = data.user_coords;
    return request.user_start_infos.map((info, index) => {
      const coord = coords[index];
      return {
        id: info.user_seq,
        label: info.user_start_addr,
        timeLabel: coord?.travel_time_label ?? '조회 불가',
        isEstimated: station?.estimated_mask?.[index] ?? false,
        position: coord ? toBoxPosition(coord, coords) : null,
      };
    });
  }, [data, request, station]);

  // 다음 단계(장소 추천)도 같은 참여자 목록으로 API를 호출한다
  useEffect(() => {
    if (request) saveStartInfos(request.user_start_infos);
  }, [request]);

  // 중간위치는 조회에 성공했을 때만 넘겨준다
  useEffect(() => {
    if (midpointName) saveMidpoint(midpointName);
  }, [midpointName]);

  const renderBody = () => {
    if (request && isPending) {
      return (
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>중간위치를 찾고 있어요</p>
          <p className={styles.loadingSubText}>대중교통 소요시간을 계산하고 있어요</p>
        </div>
      );
    }

    if (!request || isError || !station) {
      const message = request
        ? describeMiddlePointError(error)
        : {
            title: '출발지를 다시 입력해 주세요',
            description: `중간위치를 찾으려면 출발지가 ${MIN_DEPARTURES}곳 이상 필요해요`,
          };

      return (
        <div className={styles.loadingBox}>
          <div className={styles.errorIcon}>!</div>
          <p className={styles.loadingText}>{message.title}</p>
          <p className={styles.loadingSubText}>{message.description}</p>
          <div className={styles.errorAction}>
            <button
              className={styles.outlineButton}
              onClick={() => (request ? refetch() : navigate('/place/direct'))}
            >
              {request ? '다시 시도하기' : '출발지 입력하러 가기'}
            </button>
          </div>
        </div>
      );
    }

    // -1은 경로 조회 실패라 소요시간 범위 계산에서 뺀다
    const minutes = station.travel_times.filter((time) => time >= 0);

    return (
      <>
        <h2 className={styles.pageTitle}>중간위치는 {midpointName} 근처예요</h2>
        <p className={styles.helperText} style={{ marginBottom: 16 }}>
          {results.length}명의 출발지를 기준으로 찾았어요
        </p>

        <div className={styles.mockMap}>
          {results.map((result) =>
            result.position ? (
              <div key={result.id} className={styles.mapMiniPin} style={result.position} />
            ) : null,
          )}
          <div className={styles.mapPin}>
            <div className={styles.mapPinDot} />
            <span className={styles.mapPinLabel}>{midpointName}</span>
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
            <span className={styles.travelTime}>
              {result.timeLabel}
              {result.isEstimated && ' (추정)'}
            </span>
          </div>
        ))}

        {minutes.length > 0 && (
          <div className={styles.noticeBoxGrey} style={{ marginTop: 14 }}>
            모두 {Math.min(...minutes)}~{Math.max(...minutes)}분 안에 도착할 수 있어요
          </div>
        )}

        {data?.warnings?.map((warning) => (
          <div key={warning} className={styles.noticeBoxGrey} style={{ marginTop: 8 }}>
            {warning}
          </div>
        ))}

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
        station ? (
          <div className={styles.footer}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/place/result?from=direct')}
            >
              모임장소 추천받기
            </button>
            <span className={styles.caption}>
              {midpointName} 근처에서 만나기 좋은 곳을 추천해 드려요!
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

      {isSheetOpen && station && (
        <ShareSheet
          title="중간위치 공유하기"
          message={`[위밋톡] 모두를 위한 최적의 위치는? ${midpointName} 근처예요!`}
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
