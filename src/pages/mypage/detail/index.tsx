import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { GNB } from '@/ui/gnb/gnb';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from './page.css';

export const MyPageDetail = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword) {
      setError('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (!newPassword) {
      setError('새 비밀번호를 입력해주세요.');
      return;
    }
    if (newPassword.length < 8) {
      setError('새 비밀번호는 8자 이상이어야 해요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않아요.');
      return;
    }
    setError('');
    setShowSuccessModal(true);
  };

  return (
    <PageLayout
      header={
        <AppBar title="회원정보 수정" showBackButton onBackClick={() => navigate(-1)} />
      }
      footer={<GNB />}
    >
      <div className={styles.container}>
        {/* 기본정보 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>기본정보</div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>이름</span>
            <span className={styles.infoValue}>고도희</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>닉네임</span>
            <span className={styles.infoValue}>도토리</span>
            <button className={styles.editButton}>수정</button>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>비밀번호</span>
            <span className={styles.infoValue}>••••••</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>이메일</span>
            <span className={styles.infoValue}>abce@gmail.com</span>
            <button className={styles.editButton}>수정</button>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>연락처</span>
            <span className={styles.infoValue}>010-1235-6789</span>
            <button className={styles.editButton}>수정</button>
          </div>
        </div>

        {/* 비밀번호 변경 */}
        <div className={styles.passwordSection}>
          <div className={styles.sectionTitle}>비밀번호 변경</div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>현재 비밀번호</label>
            <input
              className={styles.input}
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>새 비밀번호</label>
            <input
              className={styles.input}
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <input
            className={styles.input}
            type="password"
            placeholder="새 비밀번호를 한번 더 확인해주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <span className={styles.errorText}>{error}</span>}
          <Button color="grey" size="l" onClick={handleChangePassword}>비밀번호 변경</Button>
        </div>

        {/* 비밀번호 변경 완료 팝업 */}
        {showSuccessModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <span className={styles.modalMessage}>비밀번호 변경이 완료되었습니다!</span>
              <Button
                size="s"
                color="blue"
                onClick={() => {
                  setShowSuccessModal(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                확인하기
              </Button>
            </div>
          </div>
        )}

        {/* 회원 탈퇴 */}
        <div className={styles.withdrawRow}>
          <span className={styles.withdrawLabel}>회원 탈퇴</span>
          <span className={styles.withdrawArrow}>›</span>
        </div>
      </div>
    </PageLayout>
  );
};
