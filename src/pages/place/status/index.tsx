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

import { saveMidpoint, saveStartInfos } from '../guest-session';
import { formatStationName, toBoxPosition } from '../midpoint-calc';

import * as styles from '../page.css';

const AVATAR_COLORS = ['#38BDF8', '#5AC8B0', '#6C9BF7', '#C08BEF', '#F080A8'];

/** 출발지를 아직 입력하지 않은 참여자는 중간위치 계산에서 제외한다. */
const NO_LOCATION = '위치 미입력';

/** 중간위치 화면은 목적지 종류를 아직 고르기 전이라 기본값인 지하철역으로 찾는다. */
const MEETING_TYPE = '지하철' as const;

type Member = {
  name: string;
  region: string;
  color: string;
};

const INITIAL_MEMBERS: Member[] = [
  {
    name: sessionStorage.getItem('guest_nickname') ?? '익명이 (나)',
    region: sessionStorage.getItem('guest_departure') ?? NO_LOCATION,
    color: AVATAR_COLORS[0],
  },
];

const EXTRA_MEMBERS: Member[] = [
  { name: '토끼', region: '서울시 마포구', color: AVATAR_COLORS[1] },
  { name: '민수', region: '경기도 수원시', color: AVATAR_COLORS[2] },
  { name: '지훈', region: '서울시 강남구', color: AVATAR_COLORS[3] },
  { name: '서연', region: '경기도 성남시', color: AVATAR_COLORS[4] },
];

const buildRequest = (members: Member[]): MiddlePointRequest | null => {
  const located = members.filter((member) => member.region.trim() && member.region !== NO_LOCATION);
  if (located.length < MIN_DEPARTURES) return null;

  return {
    meeting_type: MEETING_TYPE,
    // 배열 순서가 응답의 travel_times·user_coords 인덱스와 그대로 대응된다
    user_start_infos: located.map((member, index) => ({
      user_seq: String(index + 1),
      user_nickname: member.name,
      user_start_addr: member.region.trim(),
    })),
  };
};

export const GuestStatusPage = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [extraIdx, setExtraIdx] = useState(0);

  const request = useMemo(() => buildRequest(members), [members]);
  const { data, error, isPending, isError } = useMiddlePoint(request);

  const midpointName = data ? formatStationName(data.recommended_station.name) : '';

  // 출발지 미입력자는 요청에서 빠져 인덱스가 밀리므로 닉네임으로 소요시간을 맞춘다
  const travelLabelByName = useMemo(
    () => new Map(data?.user_coords.map((coord) => [coord.user_nickname, coord.travel_time_label])),
    [data],
  );
  const isCalculating = !!request && isPending;

  // 다음 단계(장소 추천)도 같은 참여자 목록으로 API를 호출한다
  useEffect(() => {
    if (request) saveStartInfos(request.user_start_infos);
  }, [request]);

  const handleAddSimulation = () => {
    if (extraIdx >= EXTRA_MEMBERS.length) return;
    setMembers((prev) => [...prev, EXTRA_MEMBERS[extraIdx]]);
    setExtraIdx((i) => i + 1);
  };

  const handleGetRecommendation = () => {
    if (!midpointName) return;
    saveMidpoint(midpointName);
    navigate('/place/result?from=share');
  };

  const renderMapContent = () => {
    if (!request) {
      return (
        <span className={styles.mapEmptyText}>
          출발지가 {MIN_DEPARTURES}개 이상 모이면 중간위치를 보여드려요
        </span>
      );
    }

    if (isCalculating) {
      return <span className={styles.mapEmptyText}>중간위치를 찾고 있어요</span>;
    }

    if (isError || !data) {
      const message = describeMiddlePointError(error);
      return <span className={styles.mapEmptyText}>{message.title}</span>;
    }

    return (
      <>
        {data.user_coords.map((coord) => (
          <div
            key={coord.user_seq}
            className={styles.mapMiniPin}
            style={toBoxPosition(coord, data.user_coords)}
          />
        ))}
        <div className={styles.mapPin}>
          <div className={styles.mapPinDot} />
          <span className={styles.mapPinLabel}>중간위치 · {midpointName}</span>
        </div>
      </>
    );
  };

  return (
    <PageLayout
      header={
        <AppBar
          title="모임장소 정하기"
          showBackButton
          onBackClick={() => navigate('/place/share')}
        />
      }
      footer={
        <div className={styles.footer}>
          <button
            className={styles.primaryButton}
            onClick={handleGetRecommendation}
            disabled={!midpointName}
          >
            {isCalculating ? '중간위치를 찾고 있어요' : '모임장소 추천받기'}
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.6px', margin: 0 }}>
            <span style={{ color: '#3B82F6' }}>{members.length}명</span>이 출발지를 입력했어요
          </h2>
          <span className={styles.countText}>{members.length}/10</span>
        </div>
        <p className={styles.helperText} style={{ marginBottom: 16, marginTop: 6 }}>
          출발지가 입력될 때마다 실시간으로 업데이트돼요
        </p>

        {/* 지도 목업 */}
        <div className={styles.mockMap}>{renderMapContent()}</div>

        {data?.warnings?.map((warning) => (
          <div key={warning} className={styles.noticeBoxGrey} style={{ marginTop: 10 }}>
            {warning}
          </div>
        ))}

        <div className={styles.sectionTitle}>입력한 사람</div>
        {members.map((m) => (
          <div key={m.name} className={styles.memberRow}>
            <div className={styles.avatar} style={{ backgroundColor: m.color }}>
              {m.name[0]}
            </div>
            <div className={styles.memberInfo}>
              <div className={styles.memberName}>{m.name}</div>
            </div>
            <span className={styles.memberSub}>
              {m.region}
              {travelLabelByName.get(m.name) && ` · ${travelLabelByName.get(m.name)}`}
            </span>
          </div>
        ))}

        {extraIdx < EXTRA_MEMBERS.length && (
          <button
            className={styles.outlineButton}
            style={{ marginTop: 14 }}
            onClick={handleAddSimulation}
          >
            ＋ 참여자 입력 시뮬레이션
          </button>
        )}
        <button className={styles.textButton} onClick={() => navigate('/place/share')}>
          링크 다시 공유하기
        </button>
      </div>
    </PageLayout>
  );
};
