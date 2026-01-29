import { OnboardingLogo } from '@/assets';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';

import * as styles from './page.css';

export const OnBoardingPage = () => {
  return (
    <PageLayout className={styles.onboarding}>
      <Spacer size={120} />
      <div className={styles.logo}>
        <OnboardingLogo />
      </div>
      <Spacer size={36} />
      <div className={styles.title}>
        모임 약속, <br /> 이제 한번에 끝내요
      </div>
      <Spacer size={15} />
      <div className={styles.subtitle}>
        일정 조율부터 장소 투표, 정산까지 <br /> 복잡했던 모임 준비를 위밋톡 하나로 쉽고 간편하게
      </div>
      <div className={styles.cardBox}>
        <div className={styles.card}>
          <span className={styles.cardIcon}>📅</span>
          <span className={styles.cardTitle}>"언제 만날까요?" 모임 일정 조율 고민 그만</span>
          <span className={styles.cardDesc}>
            공유 캘린더로 모두가 가능한 날을 한눈에 <br />
            카톡 단톡방에서 날짜 맞추느라 고생하지 마세요
          </span>
        </div>
      </div>
    </PageLayout>
  );
};
