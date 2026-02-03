import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';

import * as styles from './page.css';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  return (
    <PageLayout
      className={styles.container}
      header={<AppBar title="회원가입" showBackButton onBackClick={() => navigate(-1)} />}
    >
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입 👋</h1>
          <p className={styles.description}>
            필요한 정보만 입력하면
            <br />
            바로 시작할 수 있어요
          </p>
        </div>

        {/* Form */}
        <div className={styles.form}>
          {/* 이름 */}
          <div className={styles.field}>
            <label className={styles.label}>이름</label>
            <input className={styles.input} placeholder="이름을 입력하세요" />
          </div>

          {/* 전화번호 */}
          <div className={styles.field}>
            <label className={styles.label}>전화번호</label>
            <input className={styles.input} placeholder="01012345678" />
            <span className={styles.helperText}>- 없이 숫자만 입력해주세요</span>
          </div>

          {/* 비밀번호 */}
          <div className={styles.field}>
            <label className={styles.label}>비밀번호</label>
            <input className={styles.input} type="password" placeholder="비밀번호 입력" />
            <span className={styles.helperText}>최소 6자 이상 입력해주세요</span>
          </div>

          {/* 이메일 + 인증 */}
          <div className={styles.field}>
            <label className={styles.label}>이메일</label>
            <div className={styles.inlineField}>
              <input className={styles.input} type="email" placeholder="example@email.com" />
              <button className={styles.verifyButton} onClick={() => setEmailSent(true)}>
                인증하기
              </button>
            </div>
          </div>

          {/* 인증번호 */}
          {emailSent && !emailVerified && (
            <div className={styles.field}>
              <label className={styles.label}>인증번호</label>
              <div className={styles.inlineField}>
                <input className={styles.input} placeholder="인증번호 입력" />
                <button className={styles.verifyButton} onClick={() => setEmailVerified(true)}>
                  확인
                </button>
              </div>
            </div>
          )}
          {/* 인증 완료 */}
          {emailVerified && (
            <div className={styles.verifiedText}>이메일 인증이 완료되었습니다 ✔</div>
          )}
        </div>

        <Spacer size={28} />
        <Button onClick={() => navigate('/onboarding/complete')}>회원가입</Button>
      </div>
    </PageLayout>
  );
};
