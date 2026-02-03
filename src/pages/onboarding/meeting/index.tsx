import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from './page.css';

export const MeetingPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      className={styles.container}
      header={<AppBar title="모임 참여하기" showBackButton onBackClick={() => navigate(-1)} />}
    >
      <div className={styles.content}>
        <div className={styles.party}>🎉</div>
        <div className={styles.title}>초대 링크로 참여하세요!</div>
        <div className={styles.desc}>
          주최자가 보낸 초대 링크를 통해 <br /> 모임에 바로 참여할 수 있어요
        </div>
      </div>
      <div className={styles.content2}>
        <div className={styles.title2}>📱 참여 방법</div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>주최자에게 초대 링크 받기</div>
            <div className={styles.stepDesc}>카카오톡, 문자 등으로 받은 링크를 확인하세요</div>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>링크 클릭하기</div>
            <div className={styles.stepDesc}>
              초대 링크를 클릭하면 자동으로 모임 페이지로 이동해요
            </div>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>모임 참여 완료!</div>
            <div className={styles.stepDesc}>바로 모임 채팅방에 입장하여 대화를 시작하세요</div>
          </div>
        </div>
      </div>
      <div className={styles.content3}>
        <div className={styles.title3}>아직 초대 링크가 없으신가요?</div>
        <div className={styles.desc3}>주최자에게 초대 링크를 요청해보세요!</div>
      </div>
    </PageLayout>
  );
};
