import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { chatStore } from '@/store/chat-store';
import { pollStore } from '@/store/poll-store';
import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';
import { cx } from '@/ui/utils';

import * as chatStyles from '../room/page.css';
import * as styles from './page.css';

const TABS = [
  { key: 'chat', label: '채팅' },
  { key: 'ai', label: 'AI 매니저' },
  { key: 'calendar', label: '캘린더' },
  { key: 'poll', label: '투표', badge: 3 },
  { key: 'settlement', label: '정산' },
];

const MEMBERS = [
  { name: '민지', text: '민', color: '#e53935' },
  { name: '수현', text: '수', color: '#fb8c00' },
  { name: '지혜', text: '지', color: '#7c3aed' },
  { name: '현우', text: '현', color: '#10b981' },
  { name: '서연', text: '서', color: '#ec4899' },
];

const STEPS = [
  { num: 1, label: '모임 준비' },
  { num: 2, label: '확정' },
  { num: 3, label: '정산' },
];

type Place = {
  name: string;
  desc: string;
  address: string;
};

export const AiManagerPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [currentStep] = useState(1);
  const [fairPlace, setFairPlace] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendations, setRecommendations] = useState<Place[]>([]);
  const [addedPlaces, setAddedPlaces] = useState<Set<string>>(new Set());

  const handleAddToPoll = (place: Place) => {
    pollStore.addPlace(place.name, place.address);
    setAddedPlaces((prev) => new Set(prev).add(place.name));
  };

  const handleTabClick = (key: string) => {
    if (key === 'chat') {
      navigate(`/room/${roomId}/chat`);
      return;
    }
    if (key === 'ai') return;
    navigate(`/room/${roomId}/${key}`);
  };

  const handleExtractFairPlace = () => {
    setIsExtracting(true);
    // 목업: 1.5초 후 결과
    setTimeout(() => {
      const place = '강남역';
      setFairPlace(place);
      setIsExtracting(false);

      // 채팅방에 AI 매니저 메시지 전송
      chatStore.addMessage({
        type: 'ai',
        sender: 'AI 매니저',
        avatarColor: '#6366f1',
        avatarText: 'AI',
        text: `우리 모임 공평한 만남 장소는 ${place}입니다! 🎯\n모든 참여자의 위치를 기반으로 추출했어요.`,
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        showAvatar: true,
        showName: true,
      });
    }, 1500);
  };

  const handleRecommend = (searchKeyword: string) => {
    if (!searchKeyword.trim()) return;
    setIsRecommending(true);
    setRecommendations([]);
    // 목업: 2초 후 추천 결과
    setTimeout(() => {
      setRecommendations([
        {
          name: `더 플레이스 SFC몰점`,
          desc: `세련된 공간에서 파스타, 피자 등 캐주얼 이탈리안 요리를 즐길 수 있는 레스토랑`,
          address: `${searchKeyword} 인근 · 도보 5분`,
        },
        {
          name: `크래프트한스 시청점`,
          desc: `다양한 수제 맥주와 안주를 즐기기에 좋은 곳. 모임 후 가볍게 즐기기 좋은 곳`,
          address: `${searchKeyword} 인근 · 도보 8분`,
        },
      ]);
      setIsRecommending(false);
    }, 2000);
  };

  return (
    <PageLayout
      header={
        <>
          <AppBar
            title="대학 동기 모임"
            subTitle="6명 참여 중"
            showBackButton
            onBackClick={() => navigate(-1)}
          />
          <div className={chatStyles.tabBar}>
            {TABS.map((tab) => (
              <div
                key={tab.key}
                className={cx(
                  chatStyles.tab,
                  tab.key === 'ai' && chatStyles.activeTab,
                )}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.label}
                {tab.badge && (
                  <span className={chatStyles.tabBadge}>{tab.badge}</span>
                )}
              </div>
            ))}
          </div>
        </>
      }
      footer={<GNB />}
    >
      <div className={styles.container}>
        {/* ── 참여자 ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>친구 {MEMBERS.length}명</div>
          <div className={styles.memberList}>
            {MEMBERS.map((m) => (
              <div key={m.name} className={styles.memberItem}>
                <div
                  className={styles.memberAvatar}
                  style={{ backgroundColor: m.color }}
                >
                  {m.text}
                </div>
                <span className={styles.memberName}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 진행 상황 ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>진행 상황</div>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={styles.step}>
                  <div
                    className={cx(
                      styles.stepCircle,
                      currentStep >= s.num && styles.stepCircleActive,
                    )}
                  >
                    {s.num}
                  </div>
                  <span
                    className={cx(
                      styles.stepLabel,
                      currentStep >= s.num && styles.stepLabelActive,
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cx(
                      styles.stepLine,
                      currentStep > s.num && styles.stepLineActive,
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.statusMessage}>
            현재 장소 선정 중이에요 📍
          </div>
        </div>

        {/* ── 공평한 장소 ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>공평한 장소는?</div>
          <div className={styles.fairPlaceBox}>
            {fairPlace ? (
              <>
                <span className={styles.fairPlaceResult}>📍 {fairPlace}</span>
                <span className={styles.fairPlaceDesc}>
                  모든 참여자의 위치를 기반으로 추출된 중간 지점이에요
                </span>
              </>
            ) : (
              <span className={styles.fairPlaceDesc}>
                참여자들의 위치를 기반으로 공평한 중간 지점을 찾아드려요
              </span>
            )}
            <button
              className={styles.primaryButton}
              onClick={handleExtractFairPlace}
              disabled={isExtracting}
            >
              {isExtracting ? '⏳ 추출 중...' : '✨ 공평한 장소 추출하기'}
            </button>
          </div>
        </div>

        {/* ── AI 장소 추천 ── */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>AI 장소 추천 받기</div>

          {/* 공평한 장소에서 불러오기 or 직접 입력 */}
          <div className={styles.recommendInput}>
            <input
              className={styles.input}
              placeholder="어디 인근으로 추천받을까요?"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  handleRecommend(keyword);
                }
              }}
            />
            {fairPlace && (
              <button
                className={styles.smallButton}
                onClick={() => {
                  setKeyword(fairPlace);
                  handleRecommend(fairPlace);
                }}
              >
                불러오기
              </button>
            )}
          </div>
          <button
            className={styles.primaryButton}
            onClick={() => handleRecommend(keyword)}
            disabled={isRecommending || !keyword.trim()}
          >
            {isRecommending ? '🔄 AI가 장소를 찾고 있어요...' : '✨ AI 장소 추천 받기'}
          </button>

          {/* 로딩 */}
          {isRecommending && (
            <div className={styles.loadingBox}>
              🔍 AI가 장소를 찾고 있어요...
            </div>
          )}

          {/* 추천 결과 */}
          {recommendations.length > 0 && (
            <div className={styles.placeCardList}>
              {recommendations.map((place, i) => (
                <div key={i} className={styles.placeCard}>
                  <div className={styles.placeInfo}>
                    <span className={styles.placeName}>{place.name}</span>
                    <span className={styles.placeDesc}>{place.desc}</span>
                    <span className={styles.placeAddress}>{place.address}</span>
                  </div>
                  <div className={styles.placeActions}>
                    <button
                      className={styles.smallButton}
                      onClick={() => handleAddToPoll(place)}
                      disabled={addedPlaces.has(place.name)}
                    >
                      {addedPlaces.has(place.name) ? '추가됨 ✓' : '투표에 추가'}
                    </button>
                  </div>
                </div>
              ))}
              <button
                className={styles.moreButton}
                onClick={() => handleRecommend(keyword)}
              >
                ✨ 다른 장소도 추천받기
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
