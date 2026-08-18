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
        {/* TODO(백엔드 연동): 아래 이름/전화번호/비밀번호/이메일 input이 전부 state에 연결되어 있지 않음(값 저장 안 됨).
            전부 state 연결 필요. 백엔드 auth-service에 실제 동작하는 POST /join(회원가입), POST /login이 이미 존재함. */}
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
          {/* TODO(백엔드 연동): "인증하기"/"확인" 버튼이 실제 이메일 발송·인증번호 검증 API 호출 없이 로컬 state만 토글함.
              이메일 인증번호 발송/검증 API 자체가 백엔드에 없음 — 신규 개발 필요. */}
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
        {/* TODO(백엔드 연동): 지금은 API 호출 없이 바로 이동함. POST /join 호출 후 성공 응답을 받은 뒤에만 navigate 하도록 변경 필요. */}
        <Button onClick={() => navigate('/onboarding/complete')}>회원가입</Button>
      </div>
    </PageLayout>
  );
};
