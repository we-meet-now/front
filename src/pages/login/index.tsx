import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';

import * as styles from './page.css';

export const LoginPage = () => {
  const navigate = useNavigate();

  // TODO(백엔드 연동): 실제 POST {AUTH_URL}/login 호출 없이 목업 토큰만 저장함.
  // 응답으로 받은 실제 accessToken/refreshToken으로 교체 필요.
  const handleLogin = () => {
    localStorage.setItem('accessToken', 'mock-access-token');
    navigate('/create-meeting');
  };

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
        {/* TODO(백엔드 연동): 이메일/비밀번호 input이 아직 state에 연결되어 있지 않음(값 저장 안 됨).
            state 연결 후 로그인 버튼에서 POST {AUTH_URL}/login 호출 필요.
            요청: { email, password } / 응답: accessToken, refreshToken 등 → localStorage 저장(PrivateRoute가 accessToken 존재 여부로 인증 판단). */}
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
        <Button onClick={handleLogin}>로그인</Button>

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
