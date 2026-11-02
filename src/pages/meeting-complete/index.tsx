import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Button } from '@/ui/button/button';
import { buildInviteLink, getRoomPath } from '@/utils/invite-link';

import * as styles from './page.css';

export const MeetingCompletePage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const enterCode = searchParams.get('code');

  // 방장도 초대받은 참여자와 같은 채팅방 경로로 들어가야 같은 방에서 대화한다
  const handleEnterRoom = () => {
    if (!roomId) return;
    navigate(getRoomPath(roomId, enterCode));
  };

  const handleCopyLink = async () => {
    if (!roomId || !enterCode) {
      alert('초대 코드가 없어 링크를 만들 수 없어요.');
      return;
    }
    await navigator.clipboard.writeText(buildInviteLink(roomId, enterCode));
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
