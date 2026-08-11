import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from '../page.css';

const NICK_PRESETS = ['익명이', '토끼', '사자', '곰돌이'];
const AVATAR_COLORS = ['#38BDF8', '#5AC8B0', '#6C9BF7', '#C08BEF', '#F080A8'];

export const GuestSharePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'share'>('input');
  const [departure, setDeparture] = useState('');
  const [nickname, setNickname] = useState('익명이');
  const [customNick, setCustomNick] = useState('익명이');

  const mockLink = 'wemeettalk.com/meet/abc123';

  const handleNext = () => {
    if (!departure.trim()) return;
    sessionStorage.setItem('guest_nickname', nickname);
    sessionStorage.setItem('guest_departure', departure);
    setStep('share');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  if (step === 'share') {
    return (
      <PageLayout
        header={
          <AppBar
            title="모임장소 정하기"
            showBackButton
            onBackClick={() => setStep('input')}
          />
        }
        footer={
          <div className={styles.footer}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/place/status')}
            >
              입력 현황 보러 가기
            </button>
          </div>
        }
      >
        <div className={styles.body}>
          <div className={styles.sectionTitle} style={{ marginTop: 24 }}>
            이제 모두에게 물어볼 차례예요!
          </div>
          <p className={styles.helperText} style={{ marginBottom: 20 }}>
            링크를 전달하고, 출발지 입력을 요청해 보세요
          </p>

          <div className={styles.shareCard}>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#4D5159', margin: 0 }}>
              [위밋톡] 우리 어디서 만날까요?<br />
              출발지만 입력하면, 모두의 중간위치를 찾고 만날 장소도 추천해 드려요!
            </p>
            <p className={styles.shareLink}>{mockLink}</p>
            <p className={styles.helperText}>⏱ 링크는 7일 동안 유효해요</p>
            <button
              className={styles.outlineButton}
              style={{ marginTop: 12, height: 38, fontSize: 13.5 }}
              onClick={() => handleCopy(mockLink)}
            >
              링크 복사하기
            </button>
          </div>

          <div className={styles.sectionTitle}>공유하기</div>
          <div className={styles.shareButtons}>
            <button className={styles.shareIconButton}>
              <span>💬</span>
              <span className={styles.shareIconLabel}>카카오톡</span>
            </button>
            <button className={styles.shareIconButton}>
              <span>📤</span>
              <span className={styles.shareIconLabel}>다른 앱</span>
            </button>
            <button
              className={styles.shareIconButton}
              onClick={() => handleCopy(mockLink)}
            >
              <span>🔗</span>
              <span className={styles.shareIconLabel}>링크 복사</span>
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      header={
        <AppBar
          title="모임장소 정하기"
          showBackButton
          onBackClick={() => navigate('/place')}
        />
      }
      footer={
        <div className={styles.footer}>
          <button
            className={styles.primaryButton}
            onClick={handleNext}
            disabled={!departure.trim()}
          >
            다음
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <h2 className={styles.sectionTitle} style={{ marginTop: 24, fontSize: 20 }}>
          먼저, 내 출발지를<br />입력해 주세요
        </h2>

        <div className={styles.section}>
          <label className={styles.label}>출발지</label>
          <input
            className={styles.input}
            placeholder="출발지를 입력해 주세요"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <p className={styles.helperText}>
            🔒 출발지는 시·구까지만 공개되고, 상세주소는 공개되지 않아요
          </p>
        </div>

        {departure.trim() && (
          <div className={styles.section}>
            <label className={styles.label}>닉네임</label>
            <input
              className={styles.input}
              placeholder="닉네임 입력 (최대 8자)"
              maxLength={8}
              value={customNick}
              onChange={(e) => {
                setCustomNick(e.target.value);
                setNickname(e.target.value);
              }}
            />
            <div className={styles.nickChips}>
              {NICK_PRESETS.map((nick, i) => (
                <button
                  key={nick}
                  className={`${styles.nickChip} ${nickname === nick ? styles.nickChipActive : ''}`}
                  onClick={() => {
                    setNickname(nick);
                    setCustomNick(nick);
                  }}
                >
                  <span style={{ color: AVATAR_COLORS[i], marginRight: 4 }}>●</span>
                  {nick}
                </button>
              ))}
            </div>
            <p className={styles.helperText}>다른 사람에게 보여질 이름이에요</p>
            <div className={styles.noticeBoxGrey} style={{ marginTop: 12 }}>
              ✓ 내 출발지 입력 완료! 이제 모두에게 출발지 입력을 요청해 보세요
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
