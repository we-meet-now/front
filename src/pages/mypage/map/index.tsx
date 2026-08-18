import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';

export const MapSettingPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      header={<AppBar title="지도 설정" showBackButton onBackClick={() => navigate(-1)} />}
      footer={<GNB />}
    >
      {/* TODO(백엔드 연동): 화면 자체가 미구현. 백엔드에 지도/위치 관련 API가 아예 없음(주소 검색·역지오코딩 포함) — 신규 개발 필요. */}
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9ca3af' }}>
        준비 중이에요.
      </div>
    </PageLayout>
  );
};
