import { Outlet, useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';

export const MeetingLayout = () => {
  // const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <PageLayout
      header={<AppBar title="홈" showBackButton onBackClick={() => navigate(-1)} />}
      footer={<GNB />}
    >
      <Outlet />
    </PageLayout>
  );
};
