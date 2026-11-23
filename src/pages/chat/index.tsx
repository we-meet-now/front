import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { MyChatRoomItem } from '@/api/chat/room';
import { useLeaveChatRoomMutation, useMyChatRoomsQuery } from '@/api/query/chat';
import { ActionSheet } from '@/ui/action-sheet/action-sheet';
import { ConfirmPopup } from '@/ui/confirm-popup/confirm-popup';
import { Toast } from '@/ui/toast/toast';
import { cx } from '@/ui/utils';
import { getRoomPath } from '@/utils/invite-link';
import { formatCreatedDate, formatUnreadCount, getRoomAvatarColor } from '@/utils/room';

import * as styles from './page.css';

const CHAT_TABS = [
  { key: 'friends', label: '친구' },
  { key: 'chat', label: '채팅' },
];

export const ChatPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');
  const { data: rooms, isPending, isError } = useMyChatRoomsQuery();
  const leaveMutation = useLeaveChatRoomMutation();
  // ⋮ 메뉴를 연 방 → 나가기 확인을 받는 방 순서로 넘어간다
  const [menuRoom, setMenuRoom] = useState<MyChatRoomItem | null>(null);
  const [leavingRoom, setLeavingRoom] = useState<MyChatRoomItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const goCreateMeeting = () => navigate('/create-meeting');

  const handleRoomClick = ({ chatRoom }: MyChatRoomItem) => {
    navigate(getRoomPath(String(chatRoom.chatRoomId), chatRoom.enterCode));
  };

  const openLeaveConfirm = () => {
    leaveMutation.reset();
    setLeavingRoom(menuRoom);
    setMenuRoom(null);
  };

  const handleLeave = () => {
    if (!leavingRoom || leaveMutation.isPending) return;
    leaveMutation.mutate(leavingRoom.chatRoom.chatRoomId, {
      onSuccess: () => {
        setLeavingRoom(null);
        setToastMessage('채팅방을 나갔어요');
      },
    });
  };

  const renderChatList = () => {
    if (isPending) return <div className={styles.emptyState}>불러오는 중이에요...</div>;
    if (isError) return <div className={styles.emptyState}>채팅 목록을 불러오지 못했어요.</div>;
    if (rooms.length === 0) {
      return (
        <div className={styles.emptyState}>
          아직 참여 중인 모임이 없어요.
          <br />
          아래 버튼으로 첫 모임을 만들어 보세요!
        </div>
      );
    }

    return (
      <div className={styles.chatList}>
        {rooms.map((item) => {
          const { chatRoom, isNotReadCount } = item;
          const unread = formatUnreadCount(isNotReadCount);
          const detail =
            [chatRoom.meetType, chatRoom.meetTime].filter(Boolean).join(' · ') ||
            formatCreatedDate(chatRoom.inpDate);

          return (
            <div
              key={chatRoom.chatRoomId}
              className={styles.chatItem}
              onClick={() => handleRoomClick(item)}
            >
              <div
                className={styles.roomAvatar}
                style={{ backgroundColor: getRoomAvatarColor(chatRoom.chatRoomNm) }}
              >
                {chatRoom.chatRoomNm.charAt(0) || '모'}
              </div>

              <div className={styles.chatInfo}>
                <div className={styles.chatName}>{chatRoom.chatRoomNm}</div>
                {detail && <div className={styles.chatPreview}>{detail}</div>}
              </div>

              {unread && <span className={styles.unreadBadge}>{unread}</span>}

              <button
                type="button"
                className={styles.moreButton}
                aria-label={`${chatRoom.chatRoomNm} 메뉴`}
                onClick={(e) => {
                  // 줄 전체 클릭(방 입장)으로 번지지 않게 막는다
                  e.stopPropagation();
                  setMenuRoom(item);
                }}
              >
                ⋮
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* ── 친구 / 채팅 탭 ── */}
      <div className={styles.tabBar}>
        {CHAT_TABS.map((tab) => (
          <div
            key={tab.key}
            className={cx(styles.tab, activeTab === tab.key && styles.activeTab)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === 'friends' && <div className={styles.emptyState}>향후 오픈 예정이에요.</div>}

      {activeTab === 'chat' && (
        <>
          {renderChatList()}
          {/* 한 계정이 여러 모임을 만들 수 있어 목록 위에 항상 떠 있는 만들기 버튼을 둔다 */}
          <button type="button" className={styles.createFab} onClick={goCreateMeeting}>
            <span className={styles.createFabIcon} aria-hidden>
              ＋
            </span>
            모임 만들기
          </button>
        </>
      )}

      {menuRoom && (
        <ActionSheet
          items={[
            {
              icon: '🚪',
              label: '채팅방 나가기',
              desc: '내 채팅 목록에서 사라져요',
              onClick: openLeaveConfirm,
            },
          ]}
          onClose={() => setMenuRoom(null)}
        />
      )}

      {leavingRoom && (
        <ConfirmPopup
          title="채팅방을 나가시겠어요?"
          description={`'${leavingRoom.chatRoom.chatRoomNm}' 방이 목록에서 사라지고, 다시 들어오려면 초대 링크가 필요해요.`}
          confirmLabel="나가기"
          isPending={leaveMutation.isPending}
          errorMessage={leaveMutation.isError ? leaveMutation.error.message : null}
          onConfirm={handleLeave}
          onClose={() => setLeavingRoom(null)}
        />
      )}

      {toastMessage && <Toast title={toastMessage} onClose={() => setToastMessage(null)} />}
    </>
  );
};
