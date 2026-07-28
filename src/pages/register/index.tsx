import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useJoinMutation, useSendEmailMutation, useVerifyEmailMutation } from '@/api/query/auth';
import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';
import { Spacer } from '@/ui/spacer/spacer';

import * as styles from './page.css';

type SendStatus = 'idle' | 'loading' | 'sent' | 'error';
type VerifyStatus = 'idle' | 'loading' | 'success' | 'error';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const joinMutation = useJoinMutation();
  const sendEmailMutation = useSendEmailMutation();
  const verifyEmailMutation = useVerifyEmailMutation();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');

  const passwordMatched = passwordConfirm.length > 0 && password === passwordConfirm;
  const passwordMismatch = passwordConfirm.length > 0 && password !== passwordConfirm;
  const showPasswordMismatch = passwordConfirmTouched && passwordMismatch;
  const emailVerified = verifyStatus === 'success';
  const canSubmit =
    !!nickname &&
    emailVerified &&
    password.length >= 6 &&
    !passwordMismatch &&
    !joinMutation.isPending;

  const handleSubmit = () => {
    setPasswordConfirmTouched(true);
    if (!canSubmit) return;
    joinMutation.mutate(
      {
        email,
        password,
        passwordCorrect: passwordConfirm,
        nickname,
        username: '',
      },
      {
        onSuccess: () => navigate('/onboarding/complete'),
      },
    );
  };

  const handleSendCode = async () => {
    if (!email || sendStatus === 'loading') return;
    setSendStatus('loading');
    setVerifyStatus('idle');
    setCode('');
    try {
      await sendEmailMutation.mutateAsync(email);
      setSendStatus('sent');
    } catch {
      setSendStatus('error');
    }
  };

  const handleVerifyCode = async () => {
    if (!code || verifyStatus === 'loading') return;
    setVerifyStatus('loading');
    try {
      await verifyEmailMutation.mutateAsync({ email, code });
      setVerifyStatus('success');
    } catch {
      setVerifyStatus('error');
    }
  };

  const isSending = sendStatus === 'loading';

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
            <input
              className={styles.input}
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
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
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={styles.helperText}>최소 6자 이상 입력해주세요</span>
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.field}>
            <label className={styles.label}>비밀번호 확인</label>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={() => setPasswordConfirmTouched(true)}
            />
            {showPasswordMismatch && (
              <span className={styles.errorText}>비밀번호가 일치하지 않아요.</span>
            )}
            {passwordMatched && (
              <span className={styles.verifiedText}>
                <span>✔</span>
                <span>비밀번호가 일치해요</span>
              </span>
            )}
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
              <span className={styles.errorText}>
                {sendEmailMutation.error?.message ?? '인증번호 발송에 실패했어요. 다시 시도해 주세요.'}
              </span>
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
                  {verifyEmailMutation.error?.message ?? '인증번호가 올바르지 않아요. 다시 입력해 주세요.'}
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
          {joinMutation.isError && (
            <span className={styles.errorText}>{joinMutation.error.message}</span>
          )}
        </div>

        <Spacer size={28} />
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {joinMutation.isPending ? '가입 중...' : '회원가입'}
        </Button>
      </div>
    </PageLayout>
  );
};
