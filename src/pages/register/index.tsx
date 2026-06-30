import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';

import * as styles from './page.css';

type SendStatus = 'idle' | 'loading' | 'sent' | 'error';
type VerifyStatus = 'idle' | 'loading' | 'success' | 'error';

const MOCK_CODE = '123456';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockSendEmail = (_email: string): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 800));

const mockVerifyCode = (_email: string, code: string): Promise<void> =>
  new Promise((resolve, reject) =>
    setTimeout(() => (code === MOCK_CODE ? resolve() : reject()), 600),
  );

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');

  const handleSendCode = async () => {
    if (!email || sendStatus === 'loading') return;
    setSendStatus('loading');
    setVerifyStatus('idle');
    setCode('');
    try {
      await mockSendEmail(email);
      setSendStatus('sent');
    } catch {
      setSendStatus('error');
    }
  };

  const handleVerifyCode = async () => {
    if (!code || verifyStatus === 'loading') return;
    setVerifyStatus('loading');
    try {
      await mockVerifyCode(email, code);
      setVerifyStatus('success');
    } catch {
      setVerifyStatus('error');
    }
  };

  const isSending = sendStatus === 'loading';
  const emailVerified = verifyStatus === 'success';

  const sendButtonLabel = isSending
    ? '발송 중...'
    : sendStatus === 'sent'
      ? '재발송'
      : '인증번호 발송';
  const sendButtonDisabled = isSending || emailVerified;

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
          {/* 닉네임 */}
          <div className={styles.field}>
            <label className={styles.label}>닉네임</label>
            <input className={styles.input} placeholder="닉네임을 입력하세요" />
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

          {/* 이메일 + 인증번호 발송 */}
          <div className={styles.field}>
            <label className={styles.label}>이메일</label>
            <div className={styles.inlineField}>
              <input
                className={styles.input}
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailVerified}
              />
              <button
                className={
                  sendButtonDisabled ? styles.verifyButtonDisabled : styles.verifyButtonActive
                }
                onClick={handleSendCode}
                disabled={sendButtonDisabled}
              >
                {sendButtonLabel}
              </button>
            </div>
            {sendStatus === 'error' && (
              <span className={styles.errorText}>이메일을 찾을 수 없어요. 다시 확인해 주세요.</span>
            )}
            {sendStatus === 'sent' && (
              <span className={styles.helperText}>
                인증번호가 발송됐어요. 이메일을 확인해 주세요.
              </span>
            )}
          </div>

          {/* 인증번호 입력 */}
          {sendStatus === 'sent' && !emailVerified && (
            <div className={styles.codeSection}>
              <label className={styles.label}>인증번호</label>
              <div className={styles.inlineField}>
                <input
                  className={styles.input}
                  placeholder="인증번호 6자리 입력"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
                <button
                  className={
                    verifyStatus === 'loading'
                      ? styles.verifyButtonDisabled
                      : styles.verifyButtonActive
                  }
                  onClick={handleVerifyCode}
                  disabled={verifyStatus === 'loading'}
                >
                  {verifyStatus === 'loading' ? '확인 중...' : '확인'}
                </button>
              </div>
              {verifyStatus === 'error' && (
                <span className={styles.errorText}>
                  인증번호가 올바르지 않아요. 다시 입력해 주세요.
                </span>
              )}
            </div>
          )}

          {/* 인증 완료 */}
          {emailVerified && (
            <div className={styles.verifiedText}>
              <span>✔</span>
              <span>이메일 인증이 완료되었습니다</span>
            </div>
          )}
        </div>

        <Spacer size={28} />
        <Button onClick={() => navigate('/onboarding/complete')}>회원가입</Button>
      </div>
    </PageLayout>
  );
};
