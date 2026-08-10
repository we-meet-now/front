import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from './page.css';

export const GuestPlaceEntryPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      header={
        <AppBar
          title="모임장소 정하기"
          showBackButton
          onBackClick={() => navigate('/')}
        />
      }
      footer={
        <div className={styles.footer}>
          <button className={styles.primaryButton} onClick={() => navigate('/place/share')}>
            모두에게 물어보기
          </button>
          <p className={styles.caption}>모두의 출발지를 알고 계신가요?</p>
          <button className={styles.textButton} onClick={() => navigate('/place/direct')}>
            내가 직접 입력할게요
          </button>
        </div>
      }
    >
      <div className={styles.heroSection}>
        <div className={styles.heroIcon}>📍</div>
        <h1 className={styles.heroTitle}>우리 어디서 만날까요?</h1>
        <p className={styles.heroDesc}>
          모두의 출발지로 중간위치를 찾고<br />만날 장소를 추천해 드려요
        </p>
        <span className={styles.guestBadge}>회원가입 없이 이용할 수 있어요</span>
      </div>
    </PageLayout>
  );
};
