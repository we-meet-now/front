import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';

import * as styles from './page.css';

export const StartPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      className={styles.container}
      header={<AppBar title="시작하기" showBackButton onBackClick={() => navigate(-1)} />}
    >
      <div className={styles.title}>위밋톡과 함께 시작해요.</div>
      <Spacer size={15} />
      <div className={styles.desc}>어떻게 시작하시겠어요?</div>
      <div className={styles.box}>
        <div className={styles.option} onClick={() => navigate('/login')}>
          <div className={styles.star}>✨</div>
          <div className={styles.optionTitle}>모임을 만들래요</div>
          <div className={styles.optionDesc}>
            새로운 모임을 만들고 <br /> 친구들을 초대해보세요
          </div>
        </div>
        <div className={styles.option} onClick={() => navigate('/onboarding/meeting')}>
          <div className={styles.hand}>🤝</div>
          <div className={styles.optionTitle}>모임에 참여할래요</div>
          <div className={styles.optionDesc}>
            초대받은 모임에 <br /> 참여해보세요
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
