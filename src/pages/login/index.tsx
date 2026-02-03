import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';

import * as styles from './page.css';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      className={styles.container}
      header={<AppBar title="로그인" showBackButton onBackClick={() => navigate(-1)} />}
    >
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>반가워요! 👋</h1>
          <p className={styles.description}>
            간단한 정보만 입력하면
            <br />
            바로 시작할 수 있어요
          </p>
        </div>

        {/* Form */}
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>이메일</label>
            <input className={styles.input} type="email" placeholder="example@email.com" />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>비밀번호</label>
            <input className={styles.input} type="password" placeholder="비밀번호를 입력하세요" />
          </div>
        </div>

        <Spacer size={25} />
        <Button>로그인</Button>

        {/* Signup */}
        <div className={styles.signupText}>
          아직 계정이 없으신가요?
          <button className={styles.signupButton} onClick={() => navigate('/register')}>
            회원가입
          </button>
        </div>
      </div>
    </PageLayout>
  );
};
