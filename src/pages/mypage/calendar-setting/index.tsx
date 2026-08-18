import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';

export const CalendarSettingPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      header={<AppBar title="캘린더 설정" showBackButton onBackClick={() => navigate(-1)} />}
      footer={<GNB />}
    >
      {/* TODO(백엔드 연동): 화면 자체가 미구현. 캘린더 연동 설정값을 저장/조회할 API 설계 필요(백엔드에 관련 기능 없음).
          참고: 모임방 안 일정관리는 백엔드 ScheduleController에 이미 CRUD가 있음 — 이 화면(마이페이지 캘린더 "설정")과는 별개. */}
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9ca3af' }}>
        준비 중이에요.
      </div>
    </PageLayout>
  );
};
