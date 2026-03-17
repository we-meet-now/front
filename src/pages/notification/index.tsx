import { useState } from 'react';

import TrashIcon from '@/assets/icons/trash.svg?react';
import BellOffIcon from '@/assets/icons/bell-off.svg?react';
import { ActionSheet } from '@/ui/action-sheet/action-sheet';
import { NotificationCard } from '@/ui/notification-card/notification-card';

import * as styles from './page.css';

type Notification = {
  id: number;
  type: '수정' | '추가' | '리마인드' | '삭제';
  roomName: string;
  date: string;
  message: string;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: '수정',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '일정이 변경되었습니다.',
  },
  {
    id: 2,
    type: '추가',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '사진을 확인하러 가볼까요?',
  },
  {
    id: 3,
    type: '리마인드',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '모임 하루전입니다.',
  },
  {
    id: 4,
    type: '리마인드',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '모임 하루전입니다.',
  },
  {
    id: 5,
    type: '추가',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '사진을 확인하러 가볼까요?',
  },
  {
    id: 6,
    type: '수정',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '일정이 변경되었습니다.',
  },
  {
    id: 7,
    type: '삭제',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '모임이 취소되었습니다.',
  },
  {
    id: 8,
    type: '리마인드',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '모임 하루전입니다.',
  },
  {
    id: 9,
    type: '리마인드',
    roomName: '대학 동기 모임',
    date: '3월 29일',
    message: '모임 하루전입니다.',
  },
];

export const NotificationPage = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedNoti = notifications.find((n) => n.id === selectedId);

  const handleDelete = () => {
    if (selectedId === null) return;
    setNotifications((prev) => prev.filter((n) => n.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <>
      <div className={styles.list}>
        {notifications.map((noti) => (
          <NotificationCard
            key={noti.id}
            type={noti.type}
            roomName={noti.roomName}
            date={noti.date}
            message={noti.message}
            onMoreClick={() => setSelectedId(noti.id)}
          />
        ))}
      </div>

      {selectedId !== null && (
        <ActionSheet
          items={[
            {
              icon: <TrashIcon width={22} height={22} />,
              label: '삭제하기',
              onClick: handleDelete,
            },
            {
              icon: <BellOffIcon width={22} height={22} />,
              label: '알림 끄기',
              desc: selectedNoti
                ? `${selectedNoti.roomName} 알림을 끕니다.`
                : '',
              onClick: () => setSelectedId(null),
            },
          ]}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
};
