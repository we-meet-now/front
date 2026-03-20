import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { pollStore, type PollPlace } from '@/store/poll-store';
import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
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

export const PollPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [places, setPlaces] = useState<PollPlace[]>(pollStore.getPlaces());
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    return pollStore.subscribe(() => {
      setPlaces([...pollStore.getPlaces()]);
    });
  }, []);

  const handleTabClick = (key: string) => {
    if (key === 'chat') {
      navigate(`/room/${roomId}/chat`);
      return;
    }
    if (key === 'poll') return;
    navigate(`/room/${roomId}/${key}`);
  };

  const handleVote = () => {
    if (selectedId == null) return;
    pollStore.vote(selectedId);
    setSelectedId(null);
  };

  // 가장 투표 많은 장소
  const topPlace = places.length > 0
    ? [...places].sort((a, b) => b.votes - a.votes)[0]
    : null;

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
                  tab.key === 'poll' && chatStyles.activeTab,
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
        <div className={styles.pollCard}>
          <div className={styles.pollHeader}>
            <span className={styles.pollTitle}>장소 투표</span>
          </div>

          {places.length === 0 ? (
            <div className={styles.emptyMessage}>
              AI 매니저가 추천해준 장소를 투표에 추가해주세요
            </div>
          ) : (
            <>
              <div className={styles.pollMeta}>
                {places.length}개 장소 등록됨
              </div>

              {/* 장소 목록 */}
              <div className={styles.placeList}>
                {places.map((place) => (
                  <div
                    key={place.id}
                    className={cx(
                      styles.placeItem,
                      selectedId === place.id && styles.placeItemSelected,
                    )}
                    onClick={() => setSelectedId(place.id)}
                  >
                    <div
                      className={cx(
                        styles.radio,
                        selectedId === place.id && styles.radioSelected,
                      )}
                    />
                    <div className={styles.placeInfo}>
                      <span className={styles.placeName}>{place.name}</span>
                      <span className={styles.placeAddress}>{place.address}</span>
                    </div>
                    <span className={styles.voteCount}>{place.votes}표</span>
                  </div>
                ))}
              </div>

              {/* 투표 버튼 */}
              <div className={styles.buttonArea}>
                <Button
                  size="l"
                  color="blue"
                  style={{ width: '100%' }}
                  onClick={handleVote}
                  disabled={selectedId == null}
                >
                  투표하기
                </Button>
              </div>
            </>
          )}
        </div>

        {/* AI 추천 배너 */}
        {topPlace && topPlace.votes > 0 && (
          <div className={styles.aiBanner}>
            <div className={styles.aiBannerIcon}>🤖</div>
            <div className={styles.aiBannerContent}>
              <span className={styles.aiBannerTitle}>AI 추천</span>
              <span className={styles.aiBannerDesc}>
                모두의 이동 거리를 고려하면 {topPlace.name}가 가장 공평해요
              </span>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
