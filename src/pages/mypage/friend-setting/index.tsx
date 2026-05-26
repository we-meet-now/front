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
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9ca3af' }}>
        준비 중이에요.
      </div>
    </PageLayout>
  );
};
