import { useNavigate, useParams } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';
import { cx } from '@/ui/utils';

import * as chatStyles from '../room/page.css';

const TABS = [
  { key: 'chat', label: '채팅' },
  { key: 'ai', label: 'AI 매니저' },
  { key: 'calendar', label: '캘린더' },
  { key: 'poll', label: '투표', badge: 3 },
  { key: 'settlement', label: '정산' },
];

export const SettlementPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleTabClick = (key: string) => {
    if (key === 'chat') {
      navigate(`/room/${roomId}/chat`);
      return;
    }
    if (key === 'settlement') return;
    navigate(`/room/${roomId}/${key}`);
  };

  return (
    <PageLayout
      header={
        <>
          <AppBar
            title="대학 동기 모임"
            subTitle="6명 참여 중"
            showBackButton
            onBackClick={() => navigate(-1)}
          />
          <div className={chatStyles.tabBar}>
            {TABS.map((tab) => (
              <div
                key={tab.key}
                className={cx(
                  chatStyles.tab,
                  tab.key === 'settlement' && chatStyles.activeTab,
                )}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.label}
                {tab.badge && (
                  <span className={chatStyles.tabBadge}>{tab.badge}</span>
                )}
              </div>
            ))}
          </div>
        </>
      }
      footer={<GNB />}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', fontSize: '15px' }}>
        향후 오픈 예정이에요.
      </div>
    </PageLayout>
  );
};
