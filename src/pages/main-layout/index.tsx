import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';

const PAGE_TITLES: Record<string, string> = {
  home: '홈',
  chat: '채팅',
  calendar: '캘린더',
  gallery: '갤러리',
  notification: '알림 목록',
};

/** GNB 탭 화면이 아닌 하위 화면만 뒤로가기를 보여준다 */
const SUB_PAGES = new Set(['notification']);

/** 로그인 후 메인 탭(홈·채팅·캘린더·갤러리). 특정 모임에 속하지 않으므로 roomId를 쓰지 않는다 */
export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const segment = location.pathname.split('/')[1] ?? 'home';

  return (
    <PageLayout
      header={
        <AppBar
          title={PAGE_TITLES[segment] ?? '홈'}
          showBackButton={SUB_PAGES.has(segment)}
          onBackClick={() => navigate(-1)}
        />
      }
      footer={<GNB />}
    >
      <Outlet />
    </PageLayout>
  );
};
