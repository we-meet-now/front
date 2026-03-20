import * as styles from './notification-card.css';

export type NotificationType = '수정' | '추가' | '리마인드' | '삭제' | '정산';

const BADGE_COLORS: Record<NotificationType, string> = {
  리마인드: '#22c55e',
  추가: '#7c8cbf',
  수정: '#c0d4ec',
  삭제: '#e8a0a0',
  정산: '#f5e642',
};

const BADGE_TEXT_COLORS: Record<NotificationType, string> = {
  리마인드: '#ffffff',
  추가: '#ffffff',
  수정: '#333333',
  삭제: '#333333',
  정산: '#333333',
};

export type NotificationCardProps = {
  type: NotificationType;
  roomName: string;
  date: string;
  message: string;
  onMoreClick?: () => void;
};

export const NotificationCard = ({
  type,
  roomName,
  date,
  message,
  onMoreClick,
}: NotificationCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span
          className={styles.badge}
          style={{
            backgroundColor: BADGE_COLORS[type],
            color: BADGE_TEXT_COLORS[type],
          }}
        >
          {type}
        </span>
        <span className={styles.roomName}>{roomName}</span>
        <span className={styles.date}>{date}</span>
        <button className={styles.moreButton} onClick={onMoreClick}>
          ⋮
        </button>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
