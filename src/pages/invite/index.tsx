import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Button } from '@/ui/button/button';
import { getRoomPath } from '@/utils/invite-link';
import { getStoredGuestToken, isLogin } from '@/utils/isLogin';

import * as styles from './page.css';

export const InvitePage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  if (!roomId) return <Navigate replace to="/onboarding" />;

  const roomPath = getRoomPath(roomId, searchParams.get('code'));

  // 회원이거나 아직 유효한 게스트 토큰이 있으면 재발급 없이 바로 입장
  if (isLogin() || getStoredGuestToken()) return <Navigate replace to={roomPath} />;

  const handleLogin = () => {
    navigate(`/login?redirect=${encodeURIComponent(roomPath)}`);
  };

  // 게스트 토큰은 채팅방의 enter-room 응답으로 발급·저장되므로 여기서는 이동만 한다
  const handleGuestEnter = () => {
    navigate(roomPath, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>💌</div>

        <h1 className={styles.title}>모임에 초대받았어요!</h1>

        <p className={styles.description}>
          계정이 있다면 로그인하고,
          <br />
          없다면 게스트로 바로 참여할 수 있어요.
        </p>

        <div className={styles.buttonGroup}>
          <Button size="l" onClick={handleLogin}>
            로그인하고 입장하기
          </Button>

          <Button size="l" color="white" onClick={handleGuestEnter}>
            게스트로 입장하기
          </Button>
        </div>
      </div>
    </div>
  );
};
