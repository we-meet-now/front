import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cx } from '@/ui/utils';

import * as styles from './page.css';

const CHAT_TABS = [
  { key: 'friends', label: '친구' },
  { key: 'chat', label: '채팅' },
];

type ChatRoom = {
  id: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  avatars: { text: string; color: string }[];
};

const DUMMY_ROOMS: ChatRoom[] = [
  {
    id: '1',
    name: '대학 동기 모임',
    lastMessage: '도희야 반가워! 오랜만이다 ㅎㅎ',
    timeAgo: '1달 전',
    avatars: [
      { text: '민', color: '#e53935' },
      { text: '수', color: '#fb8c00' },
      { text: '지', color: '#7c3aed' },
    ],
  },
];

const AVATAR_POSITIONS: Record<number, { top: number; left: number }[]> = {
  2: [
    { top: 0, left: 4 },
    { top: 20, left: 20 },
  ],
  3: [
    { top: 0, left: 12 },
    { top: 22, left: 0 },
    { top: 22, left: 24 },
  ],
};

export const ChatPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');

  const handleRoomClick = (id: string) => {
    navigate(`/room/${id}/chat`);
  };

  return (
    <>
      {/* ── 친구 / 채팅 탭 ── */}
      <div className={styles.tabBar}>
        {CHAT_TABS.map((tab) => (
          <div
            key={tab.key}
            className={cx(
              styles.tab,
              activeTab === tab.key && styles.activeTab,
            )}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === 'friends' && (
        <div className={styles.emptyState}>향후 오픈 예정이에요.</div>
      )}

      {activeTab === 'chat' && (
      <div className={styles.chatList}>
        {DUMMY_ROOMS.map((room) => {
          const positions =
            AVATAR_POSITIONS[room.avatars.length] ?? AVATAR_POSITIONS[3]!;

          return (
            <div
              key={room.id}
              className={styles.chatItem}
              onClick={() => handleRoomClick(room.id)}
            >
              {/* 아바타 그룹 */}
              <div className={styles.avatarGroup}>
                {room.avatars.map((av, i) => (
                  <div
                    key={i}
                    className={styles.avatarCircle}
                    style={{
                      backgroundColor: av.color,
                      top: positions[i]?.top,
                      left: positions[i]?.left,
                    }}
                  >
                    {av.text}
                  </div>
                ))}
              </div>

              {/* 채팅방 정보 */}
              <div className={styles.chatInfo}>
                <div className={styles.chatName}>{room.name}</div>
                <div className={styles.chatPreview}>{room.lastMessage}</div>
              </div>

              {/* 시간 */}
              <span className={styles.chatTime}>{room.timeAgo}</span>
            </div>
          );
        })}
      </div>
      )}
    </>
  );
};
