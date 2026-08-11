import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from '../page.css';

const AVATAR_COLORS = ['#38BDF8', '#5AC8B0', '#6C9BF7', '#C08BEF', '#F080A8'];

type Member = {
  name: string;
  region: string;
  color: string;
};

const INITIAL_MEMBERS: Member[] = [
  { name: sessionStorage.getItem('guest_nickname') ?? '익명이 (나)', region: sessionStorage.getItem('guest_departure') ?? '위치 미입력', color: AVATAR_COLORS[0] },
  { name: '토끼', region: '서울시 마포구', color: AVATAR_COLORS[1] },
  { name: '민수', region: '경기도 수원시', color: AVATAR_COLORS[2] },
];

const EXTRA_MEMBERS: Member[] = [
  { name: '지훈', region: '서울시 강남구', color: AVATAR_COLORS[3] },
  { name: '서연', region: '경기도 성남시', color: AVATAR_COLORS[4] },
];

export const GuestStatusPage = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [extraIdx, setExtraIdx] = useState(0);

  const handleAddSimulation = () => {
    if (extraIdx >= EXTRA_MEMBERS.length) return;
    setMembers((prev) => [...prev, EXTRA_MEMBERS[extraIdx]]);
    setExtraIdx((i) => i + 1);
  };

  const handleGetRecommendation = () => {
    sessionStorage.setItem('guest_midpoint', '사당역');
    navigate('/place/result?from=share');
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
          <button className={styles.primaryButton} onClick={handleGetRecommendation}>
            모임장소 추천받기
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.6px', margin: 0 }}>
            <span style={{ color: '#3B82F6' }}>{members.length}명</span>이 출발지를 입력했어요
          </h2>
          <span className={styles.countText}>{members.length}/10</span>
        </div>
        <p className={styles.helperText} style={{ marginBottom: 16, marginTop: 6 }}>
          출발지가 입력될 때마다 실시간으로 업데이트돼요
        </p>

        {/* 지도 목업 */}
        <div className={styles.mockMap}>
          <div className={styles.mapMiniPin} style={{ left: '22%', top: '32%' }} />
          <div className={styles.mapMiniPin} style={{ left: '72%', top: '58%' }} />
          <div className={styles.mapMiniPin} style={{ left: '36%', top: '72%' }} />
          <div className={styles.mapPin}>
            <div className={styles.mapPinDot} />
            <span className={styles.mapPinLabel}>중간위치 · 사당역</span>
          </div>
        </div>

        <div className={styles.sectionTitle}>입력한 사람</div>
        {members.map((m) => (
          <div key={m.name} className={styles.memberRow}>
            <div className={styles.avatar} style={{ backgroundColor: m.color }}>
              {m.name[0]}
            </div>
            <div className={styles.memberInfo}>
              <div className={styles.memberName}>{m.name}</div>
            </div>
            <span className={styles.memberSub}>{m.region}</span>
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
        <button
          className={styles.textButton}
          onClick={() => navigate('/place/share')}
        >
          링크 다시 공유하기
        </button>
      </div>
    </PageLayout>
  );
};
