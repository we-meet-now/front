import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';

const PAGE_TITLES: Record<string, string> = {
  home: '홈',
  notification: '알림 목록',
  chat: '채팅',
  calendar: '캘린더',
  gallery: '갤러리',
};

export const MeetingLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const segment = location.pathname.split('/').pop() ?? 'home';
  const title = PAGE_TITLES[segment] ?? '홈';

  return (
    <PageLayout
      header={
        <AppBar
          title={title}
          showBackButton
          onBackClick={() => navigate(-1)}
        />
      }
      footer={<GNB />}
    >
      <Outlet />
    </PageLayout>
  );
};
