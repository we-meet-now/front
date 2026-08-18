import { useEffect, useState } from 'react';

import { inviteCardStore } from '@/store/invite-card-store';

import { InviteCardPicker } from './invite-card-picker';
import { PARTY_PRESETS, PartyIllust } from './party-illust';

import * as styles from './invite-info-modal.css';

type InviteInfoModalProps = {
  roomTitle: string;
  roomId: string;
  isLoggedIn: boolean;
  onClose: () => void;
};

// TODO(백엔드 연동): 초대코드가 roomId로부터 클라이언트에서 즉석 생성한 목업임.
// 백엔드에 실제 초대코드 발급 API가 생기면 roomId 기준으로 조회해서 교체 필요.
const buildInviteCode = (roomId: string) => `WMT-${roomId.padStart(4, '0').toUpperCase()}`;

export const InviteInfoModal = ({
  roomTitle,
  roomId,
  isLoggedIn,
  onClose,
}: InviteInfoModalProps) => {
  const [copied, setCopied] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selection, setSelection] = useState(inviteCardStore.getSelection());
  const inviteCode = buildInviteCode(roomId);

  useEffect(() => {
    return inviteCardStore.subscribe(() => {
      setSelection(inviteCardStore.getSelection());
    });
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const selectedPreset = PARTY_PRESETS.find((p) => p.id === selection.presetId) ?? PARTY_PRESETS[0];

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="닫기">
            ✕
          </button>

          <div className={styles.inviteCard}>
            <div className={styles.inviteIllust}>
              {selection.customImageUrl ? (
                <img
                  src={selection.customImageUrl}
                  alt="초대장 이미지"
                  className={styles.inviteCustomImage}
                />
              ) : (
                <PartyIllust preset={selectedPreset} />
              )}
            </div>

            {isLoggedIn && (
              <button
                type="button"
                className={styles.changeImageButton}
                onClick={() => setShowPicker(true)}
              >
                ✏️ 이미지 바꾸기
              </button>
            )}
          </div>

          <div className={styles.inviteRoomTitle}>{roomTitle}</div>
          <div className={styles.inviteCaption}>We Meet Talk 모임 초대장</div>

          <div className={styles.message}>위밋톡에서 함께 만나요!</div>
          <div className={styles.subMessage}>아래 초대코드로 친구를 모임에 초대해보세요</div>

          <div className={styles.codeRow}>
            <span className={styles.code}>{inviteCode}</span>
            <button type="button" className={styles.copyButton} onClick={handleCopy}>
              {copied ? '복사됨 ✓' : '복사'}
            </button>
          </div>
        </div>
      </div>

      {showPicker && (
        <InviteCardPicker
          selectedPresetId={selection.presetId}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
};
