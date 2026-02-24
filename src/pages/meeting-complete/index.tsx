import { useNavigate } from 'react-router-dom';

import { Button } from '@/ui/button/button';

import * as styles from './page.css';

export const MeetingCompletePage = () => {
  const navigate = useNavigate();

  // 나중에는 API 응답으로 roomId 받게 될 것
  const roomId = 'abc123';

  const handleEnterRoom = () => {
    navigate(`/meeting/${roomId}`);
  };

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/meeting/${roomId}`;
    await navigator.clipboard.writeText(link);
    alert('링크가 복사되었습니다!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>

        <h1 className={styles.title}>모임이 생성되었어요!</h1>

        <p className={styles.description}>이제 친구들에게 초대 링크를 공유해보세요.</p>

        <div className={styles.buttonGroup}>
          <Button size="l" onClick={handleEnterRoom}>
            모임방 입장하기
          </Button>

          <Button size="l" color="white" onClick={handleCopyLink}>
            초대 링크 복사
          </Button>
        </div>
      </div>
    </div>
  );
};
