import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { EnterRoomResponse } from '@/api/chat/room';
import { useGuestUsernameQuery, useUserInfoQuery } from '@/api/query/auth';
import { useEnterRoomQuery } from '@/api/query/chat';
import { type StompMessage, useStompChat } from '@/hooks/useStompChat';
import { type Message, chatStore } from '@/store/chat-store';
import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';
import { cx } from '@/ui/utils';
import { getStoredGuestUuid, isLogin } from '@/utils/isLogin';

import * as styles from './page.css';

const TABS = [
  { key: 'chat', label: '채팅' },
  { key: 'ai', label: 'AI 매니저' },
  { key: 'calendar', label: '캘린더' },
  { key: 'poll', label: '투표', badge: 3 },
  { key: 'settlement', label: '정산' },
];

const MY_USERNAME = '도희';
const AVATAR_COLOR_MAP: Record<string, string> = {
  도희: '#3B82F6',
  민지: '#e53935',
  수현: '#fb8c00',
  지원: '#7c3aed',
  예은: '#ec4899',
};

const getAvatarColor = (name: string) =>
  AVATAR_COLOR_MAP[name] ??
  `hsl(${[...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360},60%,50%)`;

/** 게스트는 userId가 null이라 uuId로, 회원은 userId로 보낸 사람을 구분한다 */
const getSenderKey = (stomp: Pick<StompMessage, 'userId' | 'uuId'>) =>
  stomp.uuId ?? String(stomp.userId);

/** 화면에 보여줄 보낸 사람 이름. 서버가 username을 주지 않으면 식별자로 대신한다 */
const getSenderName = (stomp: Pick<StompMessage, 'userId' | 'uuId' | 'username'>) =>
  stomp.username || getSenderKey(stomp);

/** 메시지의 getSenderKey와 비교할 내 식별자 */
const getMyChatKey = (enterData: EnterRoomResponse) =>
  isLogin() ? String(enterData.loginedUserId) : (getStoredGuestUuid() ?? enterData.uuId);

type ChatIdentity = { userId: number | null; uuId: string | null; username: string | null };

const getMyIdentity = (enterData: EnterRoomResponse, guestUsername?: string): ChatIdentity => ({
  userId: enterData.loginedUserId ?? null,
  uuId: isLogin() ? null : (getStoredGuestUuid() ?? enterData.uuId),
  username: isLogin() ? null : (guestUsername ?? null),
});

/**
 * 서버는 게스트 메시지를 돌려줄 때 uuId 없이 토큰으로 찾은 userId·username만 채운다.
 * 게스트는 자기 서버 userId를 모르므로 username으로 구분한다 (username은 서버에서 중복 불가).
 */
const isMyMessage = (stomp: Pick<StompMessage, 'userId' | 'uuId' | 'username'>, me: ChatIdentity) =>
  (me.uuId != null && stomp.uuId === me.uuId) ||
  (me.userId != null && stomp.userId != null && Number(stomp.userId) === me.userId) ||
  (me.username != null && stomp.username === me.username);

const stompMsgToMessage = (
  stomp: StompMessage,
  nextId: number,
  me: ChatIdentity,
  sentAt: Date = new Date(),
): Message | null => {
  const time = sentAt.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const userId = getSenderName(stomp);

  if (stomp.chatType === 'ENTER' || stomp.chatType === 'LEAVE') {
    return {
      id: nextId,
      type: 'system',
      text:
        stomp.chatType === 'ENTER'
          ? `${userId}님이 입장하셨습니다`
          : `${userId}님이 퇴장하셨습니다`,
    };
  }

  if (stomp.chatType === 'CHAT' && stomp.message) {
    const isMine = isMyMessage(stomp, me);
    return {
      id: nextId,
      type: isMine ? 'mine' : 'other',
      sender: userId,
      avatarColor: getAvatarColor(userId),
      avatarText: userId[0],
      text: stomp.message,
      time,
      showAvatar: !isMine,
      showName: !isMine,
    };
  }

  return null;
};

export const ChatRoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const chatRoomId = Number(roomId);
  const enterRoomQuery = useEnterRoomQuery(chatRoomId);
  const enterData = enterRoomQuery.data;
  // 내 메시지 구분용 식별자 (회원: userId, 게스트: uuId)
  const username = enterData ? getMyChatKey(enterData) : MY_USERNAME;
  // STOMP 본문: 회원은 userId만, 게스트는 userId null + uuId
  const myUserId = enterData && isLogin() ? enterData.loginedUserId : null;
  const guestUuid = enterData && !isLogin() ? getMyChatKey(enterData) : undefined;
  // 수신 effect 의존성으로 쓰므로 객체 대신 원시값으로 둔다
  const myIdentityUserId = enterData?.loginedUserId ?? null;
  const myIdentityUuId = guestUuid ?? null;
  // 마이페이지를 거치지 않고 바로 입장해도 이름이 있도록 채팅방에서 직접 조회한다 (회원/게스트 중 하나만 호출됨)
  const { data: userInfo } = useUserInfoQuery();
  const guestUsernameQuery = useGuestUsernameQuery(enterRoomQuery.isSuccess);
  const guestUsername = guestUsernameQuery.data;
  const myIdentityUsername = (!isLogin() && guestUsername) || null;
  const myDisplayName = (isLogin() ? userInfo?.data.username : guestUsername) ?? username;
  // 게스트는 username 등록이 끝난 뒤 연결해야 입장 메시지에 이름이 실린다. 등록에 실패해도 채팅은 연결한다
  const isGuestUsernameSettled =
    !!isLogin() || guestUsernameQuery.isSuccess || guestUsernameQuery.isError;
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(300);

  const {
    messages: stompMessages,
    isConnected,
    sendMessage,
  } = useStompChat({
    roomId: chatRoomId,
    userId: myUserId,
    uuId: guestUuid,
    enabled: enterRoomQuery.isSuccess && isGuestUsernameSettled,
  });

  // 입장 응답의 지난 대화로 store를 채운다
  useEffect(() => {
    if (enterRoomQuery.isError) {
      chatStore.setMessages([{ id: 0, type: 'system', text: '채팅방 입장에 실패했어요.' }]);
      return;
    }
    if (!enterData) return;

    const me = getMyIdentity(enterData, guestUsername);
    chatStore.setMessages(
      (enterData.chatList ?? [])
        // 실시간 메시지 id(양수)와 겹치지 않도록 지난 대화는 음수 id를 쓴다
        .map((chat, index) => stompMsgToMessage(chat, -(index + 1), me, new Date(chat.inpDate)))
        .filter((msg): msg is Message => msg !== null),
    );
  }, [enterData, enterRoomQuery.isError, guestUsername]);

  useEffect(() => {
    return chatStore.subscribe(() => {
      setMessages([...chatStore.getMessages()]);
    });
  }, []);

  // STOMP 수신 메시지 → store에 추가 (내 CHAT 메시지는 이미 로컬에 추가됐으므로 skip)
  useEffect(() => {
    if (stompMessages.length === 0) return;
    const latest = stompMessages[stompMessages.length - 1];
    const me = { userId: myIdentityUserId, uuId: myIdentityUuId, username: myIdentityUsername };
    if (latest.chatType === 'CHAT' && isMyMessage(latest, me)) return;
    const msg = stompMsgToMessage(latest, nextIdRef.current++, me);
    if (msg) chatStore.addMessage(msg);
  }, [stompMessages, myIdentityUserId, myIdentityUuId, myIdentityUsername]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    chatStore.addMessage({
      type: 'mine',
      sender: myDisplayName,
      avatarColor: getAvatarColor(myDisplayName),
      avatarText: myDisplayName[0],
      text,
      time: new Date().toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      showAvatar: false,
      showName: false,
    });

    if (isConnected) {
      sendMessage(text);
    }

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
            subTitle={isConnected ? '6명 참여 중 · 연결됨' : '6명 참여 중 · 오프라인'}
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
                className={cx(styles.tab, activeTab === tab.key && styles.activeTab)}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.label}
                {tab.badge && <span className={styles.tabBadge}>{tab.badge}</span>}
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
            <div key={msg.id} className={cx(styles.messageRow, isMine && styles.messageRowMine)}>
              {/* 아바타: 내 메시지는 숨김, 연속 메시지도 숨김 */}
              {!isMine && (
                <div
                  className={cx(styles.avatar, !msg.showAvatar && styles.avatarHidden)}
                  style={{ backgroundColor: msg.avatarColor }}
                >
                  {msg.avatarText}
                </div>
              )}

              <div className={styles.messageBody}>
                {/* 발신자 이름: 내 메시지는 숨김 */}
                {!isMine && msg.showName && <span className={styles.senderName}>{msg.sender}</span>}
                <div className={cx(styles.bubble, isMine && styles.bubbleMine)}>{msg.text}</div>
                <div className={cx(styles.messageFooter, isMine && styles.messageFooterMine)}>
                  {isMine && msg.unread && <span className={styles.unreadCount}>{msg.unread}</span>}
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
