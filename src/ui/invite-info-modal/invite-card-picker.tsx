import { inviteCardStore } from '@/store/invite-card-store';

import { PARTY_PRESETS, PartyIllust } from './party-illust';

import * as styles from './invite-card-picker.css';

type InviteCardPickerProps = {
  selectedPresetId: string | null;
  onClose: () => void;
};

export const InviteCardPicker = ({ selectedPresetId, onClose }: InviteCardPickerProps) => {
  const handleSelectPreset = (presetId: string) => {
    inviteCardStore.selectPreset(presetId);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      inviteCardStore.selectCustomImage(URL.createObjectURL(file));
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.grabber} />
        <div className={styles.title}>초대장 이미지 바꾸기</div>

        <label className={styles.uploadRow}>
          <span className={styles.uploadIcon}>🖼️</span>
          <span className={styles.uploadLabel}>내 사진으로 직접 업로드</span>
          <input
            type="file"
            accept="image/*"
            className={styles.hiddenFileInput}
            onChange={handleFileChange}
          />
        </label>

        <div className={styles.sectionLabel}>기본 이미지 중에서 선택</div>
        <div className={styles.grid}>
          {PARTY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-label={preset.label}
              className={
                preset.id === selectedPresetId
                  ? `${styles.tile} ${styles.tileSelected}`
                  : styles.tile
              }
              onClick={() => handleSelectPreset(preset.id)}
            >
              <PartyIllust preset={preset} />
              {preset.id === selectedPresetId && <span className={styles.tileCheck}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
