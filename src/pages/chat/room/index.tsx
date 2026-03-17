import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { chatStore, type Message } from '@/store/chat-store';
import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';
import { cx } from '@/ui/utils';

import * as styles from './page.css';

const TABS = [
  { key: 'chat', label: '채팅' },
  { key: 'ai', label: 'AI 매니저' },
  { key: 'calendar', label: '캘린더' },
  { key: 'poll', label: '투표', badge: 3 },
  { key: 'settlement', label: '정산' },
];


const DUMMY_MESSAGES: Message[] = [
  // ── 날짜 구분선 ──
  {
    id: 100,
    type: 'date',
    text: '2026년 3월 16일 일요일',
  },

  // ── 시스템 메시지 ──
  {
    id: 1,
    type: 'system',
    text: '도희님이 참여했습니다',
  },

  // ── 상대방 메시지 ──
  {
    id: 2,
    type: 'other',
    sender: '민지',
    avatarColor: '#e53935',
    avatarText: '민',
    text: '도희야 반가워! 오랜만이다 ㅎㅎ',
    time: '오후 3:24',
    showAvatar: true,
    showName: true,
  },
  {
    id: 3,
    type: 'other',
    sender: '민지',
    avatarColor: '#e53935',
    avatarText: '민',
    text: '다들 언제 시간 돼?',
    time: '오후 3:24',
    showAvatar: false,
    showName: false,
  },

  {
    id: 4,
    type: 'other',
    sender: '수현',
    avatarColor: '#fb8c00',
    avatarText: '수',
    text: 'ㅋㅋ 진짜 오랜만! 다들 잘 지냈어?',
    time: '오후 3:25',
    showAvatar: true,
    showName: true,
  },

  {
    id: 5,
    type: 'mine',
    sender: '도희',
    avatarColor: '#3B82F6',
    avatarText: '도',
    text: '안녕 다들! 나도 반가워 😊',
    time: '오후 3:27',
    showAvatar: false,
    showName: false,
  },
  {
    id: 6,
    type: 'mine',
    sender: '도희',
    avatarColor: '#3B82F6',
    avatarText: '도',
    text: '나는 이번 주말 다 괜찮아~',
    time: '오후 3:27',
    unread: 2,
    showAvatar: false,
    showName: false,
  },

  // ── 오늘 ──
  {
    id: 101,
    type: 'date',
    text: '오늘',
  },

  {
    id: 7,
    type: 'other',
    sender: '지원',
    avatarColor: '#7c3aed',
    avatarText: '지',
    text: '나도 주말 좋아! 토요일 점심 어때?',
    time: '오전 10:03',
    showAvatar: true,
    showName: true,
  },

  {
    id: 8,
    type: 'other',
    sender: '민지',
    avatarColor: '#e53935',
    avatarText: '민',
    text: '좋아좋아 👍 장소는 어디로 할까?',
    time: '오전 10:05',
    showAvatar: true,
    showName: true,
  },

  {
    id: 9,
    type: 'other',
    sender: '수현',
    avatarColor: '#fb8c00',
    avatarText: '수',
    text: '강남역 근처 어때? 거기 새로 생긴 맛집 있다던데!',
    time: '오전 10:08',
    showAvatar: true,
    showName: true,
  },
  {
    id: 10,
    type: 'other',
    sender: '수현',
    avatarColor: '#fb8c00',
    avatarText: '수',
    text: '이름이 뭐더라... 잠깐만 찾아볼게 📱',
    time: '오전 10:08',
    showAvatar: false,
    showName: false,
  },

  {
    id: 11,
    type: 'mine',
    sender: '도희',
    avatarColor: '#3B82F6',
    avatarText: '도',
    text: '오 좋아~ 강남이면 접근성도 좋고!',
    time: '오전 10:12',
    unread: 3,
    showAvatar: false,
    showName: false,
  },

  {
    id: 12,
    type: 'other',
    sender: '예은',
    avatarColor: '#ec4899',
    avatarText: '예',
    text: '나도 갈게!! 🎉 몇 시에 볼까?',
    time: '오전 10:15',
    showAvatar: true,
    showName: true,
  },

  {
    id: 13,
    type: 'other',
    sender: '지원',
    avatarColor: '#7c3aed',
    avatarText: '지',
    text: '12시 반이 좋을듯! 점심 같이 먹자',
    time: '오전 10:18',
    showAvatar: true,
    showName: true,
  },

  {
    id: 14,
    type: 'mine',
    sender: '도희',
    avatarColor: '#3B82F6',
    avatarText: '도',
    text: '그래 그래~ 그럼 토요일 12시 반 강남역에서 만나자!',
    time: '오전 10:20',
    unread: 1,
    showAvatar: false,
    showName: false,
  },
];

export const ChatRoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(200);

  // store 초기화 & 구독
  useEffect(() => {
    chatStore.setMessages(DUMMY_MESSAGES);
  }, []);

  useEffect(() => {
    return chatStore.subscribe(() => {
      setMessages([...chatStore.getMessages()]);
    });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const newMsg: Message = {
      id: nextIdRef.current++,
      type: 'mine',
      sender: '도희',
      avatarColor: '#3B82F6',
      avatarText: '도',
      text,
      time: new Date().toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      showAvatar: false,
      showName: false,
    };

    chatStore.addMessage(newMsg);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTabClick = (key: string) => {
    if (key === 'chat') {
      setActiveTab(key);
      return;
    }
    navigate(`/room/${roomId}/${key}`);
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
            rightSlot={
              <div className={styles.headerIcons}>
                <button className={styles.headerIconButton}>🔍</button>
                <button className={styles.headerIconButton}>☰</button>
              </div>
            }
          />
          {/* ── 탭 네비게이션 ── */}
          <div className={styles.tabBar}>
            {TABS.map((tab) => (
              <div
                key={tab.key}
                className={cx(
                  styles.tab,
                  activeTab === tab.key && styles.activeTab,
                )}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.label}
                {tab.badge && (
                  <span className={styles.tabBadge}>{tab.badge}</span>
                )}
              </div>
            ))}
          </div>
        </>
      }
      footer={
        /* ── 메시지 입력창 ── */
        <>
          <div className={styles.inputArea}>
            <button className={styles.attachButton}>＋</button>
            <input
              className={styles.input}
              placeholder="메시지를 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.sendButton} onClick={handleSend}>
              ↑
            </button>
          </div>
          <GNB />
        </>
      }
    >
      {/* ── 채팅 영역 ── */}
      <div className={styles.chatArea}>
        {messages.map((msg) => {
          // 날짜 구분선
          if (msg.type === 'date') {
            return (
              <div key={msg.id} className={styles.dateSeparator}>
                {msg.text}
              </div>
            );
          }

          // 시스템 메시지
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className={styles.systemMessage}>
                {msg.text}
              </div>
            );
          }

          const isMine = msg.type === 'mine';

          return (
            <div
              key={msg.id}
              className={cx(
                styles.messageRow,
                isMine && styles.messageRowMine,
              )}
            >
              {/* 아바타: 내 메시지는 숨김, 연속 메시지도 숨김 */}
              {!isMine && (
                <div
                  className={cx(
                    styles.avatar,
                    !msg.showAvatar && styles.avatarHidden,
                  )}
                  style={{ backgroundColor: msg.avatarColor }}
                >
                  {msg.avatarText}
                </div>
              )}

              <div className={styles.messageBody}>
                {/* 발신자 이름: 내 메시지는 숨김 */}
                {!isMine && msg.showName && (
                  <span className={styles.senderName}>{msg.sender}</span>
                )}
                <div
                  className={cx(styles.bubble, isMine && styles.bubbleMine)}
                >
                  {msg.text}
                </div>
                <div
                  className={cx(
                    styles.messageFooter,
                    isMine && styles.messageFooterMine,
                  )}
                >
                  {isMine && msg.unread && (
                    <span className={styles.unreadCount}>{msg.unread}</span>
                  )}
                  <span className={styles.messageTime}>{msg.time}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>
    </PageLayout>
  );
};
