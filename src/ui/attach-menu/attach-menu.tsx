import * as styles from './attach-menu.css';

type AttachMenuProps = {
  onClose: () => void;
  onImageSelected: (file: File) => void;
};

export const AttachMenu = ({ onClose, onImageSelected }: AttachMenuProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelected(file);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.grabber} />
        <div className={styles.title}>사진 보내기</div>

        <label className={styles.optionRow}>
          <span className={styles.optionIcon}>📷</span>
          <span className={styles.optionLabel}>카메라로 촬영</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className={styles.hiddenFileInput}
            onChange={handleFileChange}
          />
        </label>

        <label className={styles.optionRow}>
          <span className={styles.optionIcon}>🖼️</span>
          <span className={styles.optionLabel}>갤러리에서 선택</span>
          <input
            type="file"
            accept="image/*"
            className={styles.hiddenFileInput}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};
