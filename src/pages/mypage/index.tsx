import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { GNB } from '@/ui/gnb/gnb';

import * as styles from './page.css';

const MENU_ITEMS = [
  { label: '회원정보', path: '/mypage/detail' },
  { label: '지도 설정', path: '/mypage/detail' },
  { label: '친구/채팅방 설정', path: '/mypage/detail' },
  { label: '알림/푸시 설정', path: '/mypage/detail' },
  { label: '캘린더 설정', path: '/mypage/detail' },
];

export const MyPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      header={
        <AppBar title="마이 페이지" showBackButton onBackClick={() => navigate(-1)} />
      }
      footer={<GNB />}
    >
      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>👤</div>
          <div className={styles.editBadge}>✏️</div>
        </div>
        <div className={styles.userName}>고도희</div>
        <div className={styles.userPhone}>010-1234-5678</div>
        <button className={styles.logoutButton}>로그아웃</button>
      </div>

      {/* 메뉴 리스트 */}
      <div className={styles.menuSection}>
        {MENU_ITEMS.map((item) => (
          <div
            key={item.label}
            className={styles.menuItem}
            onClick={() => navigate(item.path)}
          >
            <span>{item.label}</span>
            <span className={styles.menuArrow}>›</span>
          </div>
        ))}
      </div>

      {/* 하이라이트 메뉴 */}
      <div
        className={styles.highlightItem}
        onClick={() => navigate('/create-meeting')}
      >
        <span>🎉 모임 주최하러가기</span>
        <span className={styles.menuArrow}>›</span>
      </div>
    </PageLayout>
  );
};
