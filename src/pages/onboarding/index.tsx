import { useNavigate } from 'react-router-dom';

import { OnboardingLogo } from '@/assets';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from './page.css';

export const OnBoardingPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout className={styles.onboarding}>
      <div className={styles.logo}>
        <OnboardingLogo />
      </div>

      <div className={styles.title}>
        모임 약속, <br /> 이제 한번에 끝내요
      </div>

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
        <div className={styles.card}>
          <span className={styles.cardIcon}>📍</span>
          <span className={styles.cardTitle}>"어디서 만날까요?" 고민은 이제 그만</span>
          <span className={styles.cardDesc}>
            모두의 위치를 고려한 AI 추천 장소 <br />
            중간 지점 자동 계산, 투표로 쉽게 결정하세요
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardIcon}>💰</span>
          <span className={styles.cardTitle}>정산도 간편하게</span>
          <span className={styles.cardDesc}>
            모임 후 누가 얼마 냈는지 기록하고 <br />
            송금 링크로 바로 정산하세요
          </span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button size="l" color="blue" onClick={() => navigate('/onboarding/start')}>
          위밋톡 시작하기
        </Button>
        <Button size="l" color="white" onClick={() => navigate('/register')}>
          위밋톡 가입하기
        </Button>
      </div>
    </PageLayout>
  );
};
