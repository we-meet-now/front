import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';

export const FriendSettingPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      header={<AppBar title="친구/채팅방 설정" showBackButton onBackClick={() => navigate(-1)} />}
      footer={<GNB />}
    >
      {/* TODO(백엔드 연동): 화면 자체가 미구현. 백엔드 auth-service의 FriendController(/api/v1/friends/*)에
          목록/요청/수락/차단/삭제 CRUD가 이미 구현돼 있음. 단, 로그인 사용자 ID가 서버 코드에 1L/2L로 하드코딩되어
          있어 실사용 불가 상태 — 프론트 연동 전에 백엔드가 JWT에서 사용자를 추출하도록 먼저 고쳐야 함. */}
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9ca3af' }}>
        준비 중이에요.
      </div>
    </PageLayout>
  );
};
