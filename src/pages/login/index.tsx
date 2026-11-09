import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { useLoginMutation } from '@/api/query/auth';
import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';
import { getSafeRedirect } from '@/utils/invite-link';
import { LOCAL_STORAGE, clearGuestToken, isLogin } from '@/utils/isLogin';

import * as styles from './page.css';

/** 로그인 후 기본 진입 화면. redirect 쿼리가 없을 때 이동한다 */
const MAIN_PATH = '/';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginMutation = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectPath = getSafeRedirect(searchParams.get('redirect')) ?? MAIN_PATH;
  const canSubmit = !!email && !!password && !loginMutation.isPending;

  const handleLogin = () => {
    if (!canSubmit) return;
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: ({ data }) => {
          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, data.accessToken);
          localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, data.refreshToken);
          clearGuestToken();
          // 뒤로가기로 로그인 폼에 다시 돌아오지 않도록 히스토리를 교체한다
          navigate(redirectPath, { replace: true });
        },
      },
    );
  };

  // 이미 로그인한 사용자는 로그인 폼을 보여주지 않고 바로 보낸다
  if (isLogin()) return <Navigate replace to={redirectPath} />;

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
            <input
              className={styles.input}
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginMutation.isError && (
            <span className={styles.errorText}>{loginMutation.error.message}</span>
          )}
        </div>

        <Spacer size={25} />
        <Button onClick={handleLogin} disabled={!canSubmit}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>

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
