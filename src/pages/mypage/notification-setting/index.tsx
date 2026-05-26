import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';
import { Switch } from '@/ui/switch/switch';
import { cx } from '@/ui/utils';

import * as styles from './page.css';

// ── 공통 행 컴포넌트 ─────────────────────────────────────
const Row = ({
  label,
  on,
  onToggle,
  sub = false,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
  sub?: boolean;
}) => (
  <div className={sub ? styles.subRow : styles.row}>
    <span className={sub ? styles.subRowLabel : styles.rowLabel}>{label}</span>
    <Switch on={on} onToggle={onToggle} />
  </div>
);

const OptionRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className={styles.row}>
    <span className={styles.rowLabel}>{label}</span>
    <div className={styles.optionGroup}>{children}</div>
  </div>
);

// ── 상태 타입 ────────────────────────────────────────────
type Settings = {
  map_place: boolean;
  map_placeConfirm: boolean;
  map_placeChange: boolean;
  map_location: boolean;
  map_friendArrived: boolean;
  map_iArrived: boolean;
  map_iLate: boolean;
  map_share: boolean;
  map_shareInactive: boolean;
  map_shareStart: boolean;
  remind_departure: boolean;
  remind_timeRange: 'default' | 'custom';
  remind_preAlert: boolean;
  remind_d1: boolean;
  remind_dday: boolean;
  remind_departureTime: boolean;
  remind_participation: boolean;
  remind_scheduleChange: boolean;
  remind_scheduleDelete: boolean;
  chat_allMessages: boolean;
  chat_sound: boolean;
  chat_ringtone: boolean;
  chat_vibration: boolean;
  chat_alertContent: 'full' | 'name' | 'hidden';
  chat_autoJoin: boolean;
  chat_sortOrder: 'latest' | 'unread';
  chat_aiAutoCreate: boolean;
  chat_newRoom: boolean;
  chat_voteStart: boolean;
  chat_voteRemind: boolean;
  chat_voteEnd: boolean;
  chat_voteResult: boolean;
  chat_calendarCreate: boolean;
  chat_calendarChange: boolean;
  chat_calendarSummary: boolean;
  chat_settlementStart: boolean;
  chat_settlementAmount: boolean;
  chat_settlementComplete: boolean;
  chat_photoUpload: boolean;
};

const DEFAULT: Settings = {
  map_place: true, map_placeConfirm: true, map_placeChange: true,
  map_location: true, map_friendArrived: true, map_iArrived: true, map_iLate: true,
  map_share: true, map_shareInactive: true, map_shareStart: true,
  remind_departure: true, remind_timeRange: 'default',
  remind_preAlert: true, remind_d1: true, remind_dday: true,
  remind_departureTime: true, remind_participation: true,
  remind_scheduleChange: true, remind_scheduleDelete: true,
  chat_allMessages: true, chat_sound: true, chat_ringtone: false,
  chat_vibration: true, chat_alertContent: 'full',
  chat_autoJoin: false, chat_sortOrder: 'latest',
  chat_aiAutoCreate: true, chat_newRoom: true,
  chat_voteStart: true, chat_voteRemind: true, chat_voteEnd: true, chat_voteResult: true,
  chat_calendarCreate: true, chat_calendarChange: true, chat_calendarSummary: true,
  chat_settlementStart: true, chat_settlementAmount: true, chat_settlementComplete: true,
  chat_photoUpload: true,
};

// ── 지도 섹션 ────────────────────────────────────────────
const MapSection = ({ s, toggle }: { s: Settings; toggle: (k: keyof Settings) => void }) => (
  <>
    <div className={styles.sectionGroupHeader}>
      <span className={styles.sectionGroupTitle}>지도</span>
    </div>
    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>1. 모임 장소 확정/변경 시 알림</span>
      <Switch on={s.map_place} onToggle={() => toggle('map_place')} />
    </div>
    <Row label="장소 확정 시" on={s.map_placeConfirm} onToggle={() => toggle('map_placeConfirm')} sub />
    <Row label="장소 변경 시" on={s.map_placeChange} onToggle={() => toggle('map_placeChange')} sub />

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>2. 실시간 위치 기반 알림</span>
      <Switch on={s.map_location} onToggle={() => toggle('map_location')} />
    </div>
    <Row label="친구가 도착했을 때" on={s.map_friendArrived} onToggle={() => toggle('map_friendArrived')} sub />
    <Row label="내가 도착했을 때" on={s.map_iArrived} onToggle={() => toggle('map_iArrived')} sub />
    <Row label="내가 늦었을 때" on={s.map_iLate} onToggle={() => toggle('map_iLate')} sub />

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>3. 위치 공유 상태 알림</span>
      <Switch on={s.map_share} onToggle={() => toggle('map_share')} />
    </div>
    <Row label="위치 공유 비활성화 상태" on={s.map_shareInactive} onToggle={() => toggle('map_shareInactive')} sub />
    <Row label="위치 공유 시작 시" on={s.map_shareStart} onToggle={() => toggle('map_shareStart')} sub />
  </>
);

// ── 리마인드 섹션 ────────────────────────────────────────
const RemindSection = ({ s, toggle, set }: {
  s: Settings;
  toggle: (k: keyof Settings) => void;
  set: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
}) => (
  <>
    <div className={styles.sectionGroupHeader}>
      <span className={styles.sectionGroupTitle}>리마인드</span>
    </div>
    <div className={styles.descSection}>
      <div className={styles.descSectionTitle}>알림 세부 설정</div>
      <p className={styles.sectionDesc}>
        출발 전 리마인드 알림, 모임 시간 기준으로 미리 알림을 설정할 수 있어요.
      </p>
    </div>
    <Row label="출발 전 리마인드 알림" on={s.remind_departure} onToggle={() => toggle('remind_departure')} />
    <div className={styles.timeRangeRow}>
      <span className={styles.timeRangeLabel}>리마인드 수신 시간 범위 지정</span>
      <div className={styles.optionGroup}>
        <button
          className={cx(styles.optionButton, s.remind_timeRange === 'default' && styles.optionButtonActive)}
          onClick={() => set('remind_timeRange', 'default')}
        >
          오전 9시~오후 10시
        </button>
        <button
          className={cx(styles.optionButton, s.remind_timeRange === 'custom' && styles.optionButtonActive)}
          onClick={() => set('remind_timeRange', 'custom')}
        >
          직접 설정
        </button>
      </div>
    </div>

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>약속 전 리마인드 알림</span>
      <Switch on={s.remind_preAlert} onToggle={() => toggle('remind_preAlert')} />
    </div>
    <Row label="D-1 리마인드" on={s.remind_d1} onToggle={() => toggle('remind_d1')} sub />
    <Row label="D-Day 리마인드" on={s.remind_dday} onToggle={() => toggle('remind_dday')} sub />
    <Row label="출발 시간 안내" on={s.remind_departureTime} onToggle={() => toggle('remind_departureTime')} sub />
    <Row label="참여 확인 요청" on={s.remind_participation} onToggle={() => toggle('remind_participation')} sub />

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>일정 변경 리마인드</span>
    </div>
    <Row label="일정 변경 알림" on={s.remind_scheduleChange} onToggle={() => toggle('remind_scheduleChange')} />
    <Row label="일정 삭제 알림" on={s.remind_scheduleDelete} onToggle={() => toggle('remind_scheduleDelete')} />
  </>
);

// ── 채팅 섹션 ────────────────────────────────────────────
const ChatSection = ({ s, toggle, set }: {
  s: Settings;
  toggle: (k: keyof Settings) => void;
  set: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
}) => (
  <>
    <div className={styles.sectionGroupHeader}>
      <span className={styles.sectionGroupTitle}>채팅</span>
    </div>
    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>일반 메시지 알림</span>
      <Switch on={s.chat_allMessages} onToggle={() => toggle('chat_allMessages')} />
    </div>
    <Row label="소리" on={s.chat_sound} onToggle={() => toggle('chat_sound')} sub />
    <Row label="알림음" on={s.chat_ringtone} onToggle={() => toggle('chat_ringtone')} sub />
    <Row label="진동" on={s.chat_vibration} onToggle={() => toggle('chat_vibration')} sub />
    <OptionRow label="알림 내용">
      {(['full', 'name', 'hidden'] as const).map((v) => (
        <button
          key={v}
          className={cx(styles.optionButton, s.chat_alertContent === v && styles.optionButtonActive)}
          onClick={() => set('chat_alertContent', v)}
        >
          {v === 'full' ? '이름+메시지' : v === 'name' ? '이름' : '표시 안함'}
        </button>
      ))}
    </OptionRow>
    <Row label="채팅방 자동 참여" on={s.chat_autoJoin} onToggle={() => toggle('chat_autoJoin')} />
    <OptionRow label="채팅방 순서 정렬">
      {(['latest', 'unread'] as const).map((v) => (
        <button
          key={v}
          className={cx(styles.optionButton, s.chat_sortOrder === v && styles.optionButtonActive)}
          onClick={() => set('chat_sortOrder', v)}
        >
          {v === 'latest' ? '최신순' : '안읽은순'}
        </button>
      ))}
    </OptionRow>
    <Row label="AI 매니저 자동 생성" on={s.chat_aiAutoCreate} onToggle={() => toggle('chat_aiAutoCreate')} />
    <Row label="새 채팅방 생성 알림" on={s.chat_newRoom} onToggle={() => toggle('chat_newRoom')} />

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>투표 알림</span>
    </div>
    <Row label="투표 시작 알림" on={s.chat_voteStart} onToggle={() => toggle('chat_voteStart')} />
    <Row label="내 투표 참여 유도" on={s.chat_voteRemind} onToggle={() => toggle('chat_voteRemind')} />
    <Row label="투표 마감 알림" on={s.chat_voteEnd} onToggle={() => toggle('chat_voteEnd')} />
    <Row label="투표 결과 공유" on={s.chat_voteResult} onToggle={() => toggle('chat_voteResult')} />

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>공유 캘린더 알림</span>
    </div>
    <Row label="약속 생성 시 알림" on={s.chat_calendarCreate} onToggle={() => toggle('chat_calendarCreate')} />
    <Row label="약속 변경 시 알림" on={s.chat_calendarChange} onToggle={() => toggle('chat_calendarChange')} />
    <Row label="약속 확정 요약" on={s.chat_calendarSummary} onToggle={() => toggle('chat_calendarSummary')} />

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>정산 알림</span>
    </div>
    <Row label="정산 시작 알림" on={s.chat_settlementStart} onToggle={() => toggle('chat_settlementStart')} />
    <Row label="내 금액 확정 알림" on={s.chat_settlementAmount} onToggle={() => toggle('chat_settlementAmount')} />
    <Row label="정산 완료 메시지" on={s.chat_settlementComplete} onToggle={() => toggle('chat_settlementComplete')} />

    <div className={styles.divider} />

    <div className={styles.sectionRow}>
      <span className={styles.sectionTitle}>사진 공유 알림</span>
    </div>
    <Row label="사진 업로드 시 알림" on={s.chat_photoUpload} onToggle={() => toggle('chat_photoUpload')} />
  </>
);

// ── 메인 페이지 ──────────────────────────────────────────
export const NotificationSettingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'map' | 'remind' | 'chat'>('map');
  const [s, setS] = useState<Settings>(DEFAULT);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const remindRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Scrollspy: 스크롤 위치로 활성 탭 감지
  useEffect(() => {
    const scrollEl = wrapperRef.current?.parentElement;
    if (!scrollEl) return;

    const handleScroll = () => {
      const containerTop = scrollEl.getBoundingClientRect().top;
      const threshold = containerTop + 60;

      const chatTop = chatRef.current?.getBoundingClientRect().top ?? Infinity;
      const remindTop = remindRef.current?.getBoundingClientRect().top ?? Infinity;

      if (chatTop <= threshold) {
        setActiveTab('chat');
      } else if (remindTop <= threshold) {
        setActiveTab('remind');
      } else {
        setActiveTab('map');
      }
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  // 탭 클릭 시 해당 섹션으로 스크롤
  const handleTabClick = (key: 'map' | 'remind' | 'chat') => {
    const ref = key === 'map' ? mapRef : key === 'remind' ? remindRef : chatRef;
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggle = (k: keyof Settings) =>
    setS((prev) => ({ ...prev, [k]: !prev[k] }));

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) =>
    setS((prev) => ({ ...prev, [k]: v }));

  const TABS = [
    { key: 'map', label: '지도' },
    { key: 'remind', label: '리마인드' },
    { key: 'chat', label: '채팅' },
  ] as const;

  return (
    <PageLayout
      header={
        <>
          <AppBar title="알림/푸시 설정" showBackButton onBackClick={() => navigate(-1)} />
          <div className={styles.tabBar}>
            {TABS.map((t) => (
              <div
                key={t.key}
                className={cx(styles.tab, activeTab === t.key && styles.activeTab)}
                onClick={() => handleTabClick(t.key)}
              >
                {t.label}
              </div>
            ))}
          </div>
        </>
      }
      footer={<GNB />}
    >
      <div ref={wrapperRef}>
        <div ref={mapRef}>
          <MapSection s={s} toggle={toggle} />
        </div>
        <div className={styles.divider} />
        <div ref={remindRef}>
          <RemindSection s={s} toggle={toggle} set={set} />
        </div>
        <div className={styles.divider} />
        <div ref={chatRef}>
          <ChatSection s={s} toggle={toggle} set={set} />
        </div>
      </div>
    </PageLayout>
  );
};
