import { useNavigate } from 'react-router-dom';

import { Button } from '@/ui/button/button';

import * as styles from './page.css';

export const CompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* confetti 느낌용 (아주 가볍게) */}
      <div className={styles.confetti} />

      <div className={styles.content}>
        {/* 체크 아이콘 */}
        <div className={styles.checkWrapper}>
          <div className={styles.checkIcon}>✓</div>
        </div>

        {/* 텍스트 */}
        <h1 className={styles.title}>가입 완료! 🎉</h1>

        <p className={styles.description}>
          이제 모든 모임을 자유롭게
          <br />
          탐색하고 참여할 수 있어요
        </p>

        {/* 추천 모임 카드 */}
        {/* <div className={styles.recommendCard}>
          <span className={styles.recommendLabel}>추천 모임</span>
          <strong className={styles.recommendTitle}>대학 동기 모임</strong>
        </div> */}

        {/* CTA */}
        <Button size="l" color="white" onClick={() => navigate('/onboarding/flow')}>
          다음으로
        </Button>
      </div>
    </div>
  );
};
