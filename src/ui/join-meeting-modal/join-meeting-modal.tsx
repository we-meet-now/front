import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as styles from './join-meeting-modal.css';

type JoinMeetingModalProps = {
  onClose: () => void;
};

export const JoinMeetingModal = ({ onClose }: JoinMeetingModalProps) => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const trimmed = code.trim();

  // TODO(백엔드 연동): 초대 코드 검증 API가 없음. POST {MEETING_URL}/join?code=... 같은
  // 엔드포인트가 생기면 여기서 호출해서 실제 roomId를 받아 navigate 해야 함.
  const handleJoin = () => {
    if (!trimmed) return;
    navigate('/meeting/demo');
  };

  const handleCreateInstead = () => {
    onClose();
    navigate('/create-meeting');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="닫기">
          ✕
        </button>

        <div className={styles.icon}>👥</div>

        <div className={styles.title}>모임 참여하기</div>
        <div className={styles.subtitle}>모임 입장 코드를 입력해 주세요</div>

        <input
          className={styles.input}
          placeholder="# abc123"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />

        <button
          type="button"
          className={styles.submitButton}
          disabled={!trimmed}
          onClick={handleJoin}
        >
          참여하기 →
        </button>

        <div className={styles.footer}>
          초대 링크가 없으신가요?
          <button type="button" className={styles.footerLink} onClick={handleCreateInstead}>
            모임 만들기
          </button>
        </div>
      </div>
    </div>
  );
};
