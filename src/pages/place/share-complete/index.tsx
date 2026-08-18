import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { Toast } from '@/ui/toast/toast';
import { useToast } from '@/ui/toast/use-toast';

import * as styles from '../page.css';

// TODO(백엔드 연동): 공유 링크가 고정 문자열임. 실제 링크 생성 API가 필요함(백엔드에 없음). 카카오톡/다른 앱
// 공유 버튼도 토스트만 띄우는 목업이라 실제 카카오 SDK/Web Share API 연동이 필요함.
const mockLink = 'wemeettalk.com/meet/abc123/places';

export const GuestShareCompletePage = () => {
  const navigate = useNavigate();
  const rawPlaces = sessionStorage.getItem('guest_selected_places');
  const selectedPlaces: string[] = rawPlaces ? JSON.parse(rawPlaces) : [];
  const { message: toastMessage, showToast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast('복사되었어요'))
      .catch(() => {});
  };

  const previewText =
    selectedPlaces.length > 0
      ? `[위밋톡] 어디가 좋은지 골라줘!\n후보 장소: ${selectedPlaces.join(', ')}`
      : '[위밋톡] 어디가 좋은지 골라줘!';

  return (
    <PageLayout
      header={
        <AppBar
          title="모임장소 정하기"
          showBackButton
          onBackClick={() => navigate('/place/result')}
        />
      }
    >
      <div className={styles.body}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '-0.6px',
            lineHeight: 1.3,
            marginTop: 22,
            marginBottom: 6,
          }}
        >
          어디가 좋은지 물어보세요!
        </h2>
        <p className={styles.helperText} style={{ marginBottom: 20 }}>
          선택한 장소를 모두에게 전달해 보세요
        </p>

        <div className={styles.shareCard}>
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.65,
              color: '#4D5159',
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            {previewText}
          </p>
          <p className={styles.shareLink}>{mockLink}</p>
          <button
            className={styles.outlineButton}
            style={{ marginTop: 12, height: 38, fontSize: 13.5 }}
            onClick={() => handleCopy(`${previewText}\n${mockLink}`)}
          >
            메시지 복사하기
          </button>
        </div>

        <div className={styles.sectionTitle}>공유하기</div>
        <div className={styles.shareButtons}>
          <button
            className={styles.shareIconButton}
            onClick={() => showToast('카카오톡으로 공유했어요')}
          >
            <span>💬</span>
            <span className={styles.shareIconLabel}>카카오톡</span>
          </button>
          <button
            className={styles.shareIconButton}
            onClick={() => showToast('공유 시트를 열었어요')}
          >
            <span>📤</span>
            <span className={styles.shareIconLabel}>다른 앱</span>
          </button>
        </div>

        <div className={styles.divider} />

        {/* 위밋톡 가입 유도 CTA */}
        <div className={styles.ctaBanner}>
          <p className={styles.ctaTitle}>채팅방에서 투표로 정해볼까요?</p>
          <p className={styles.ctaDesc}>모임을 만들면 AI 매니저가 일정·장소·정산까지 도와드려요</p>
          <button
            className={styles.primaryButton}
            style={{ height: 42, fontSize: 13.5 }}
            onClick={() => navigate('/register')}
          >
            위밋톡 시작하기
          </button>
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} />}
    </PageLayout>
  );
};
