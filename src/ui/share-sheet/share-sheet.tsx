import { BottomSheet } from '@/ui/bottom-sheet/bottom-sheet';

import * as styles from './share-sheet.css';

type ShareSheetProps = {
  title?: string;
  message: string;
  url: string;
  onClose: () => void;
  onCopied: () => void;
  onCopyFailed: () => void;
};

export const ShareSheet = ({
  title = '공유하기',
  message,
  url,
  onClose,
  onCopied,
  onCopyFailed,
}: ShareSheetProps) => {
  const handleCopy = () => {
    // clipboard API는 보안 컨텍스트(https/localhost)에서만 동작하므로 실패 경로를 반드시 알린다
    navigator.clipboard
      .writeText(`${message}\n자세히보기: ${url}`)
      .then(onCopied)
      .catch(onCopyFailed);
  };

  return (
    <BottomSheet title={title} onClose={onClose}>
      <div className={styles.preview}>
        <p className={styles.previewText}>{message}</p>
        <p className={styles.previewLink}>자세히보기: {url}</p>
        <button className={styles.copyButton} onClick={handleCopy} aria-label="공유 텍스트 복사">
          ⧉
        </button>
      </div>

      <div className={styles.targets}>
        <button className={styles.target} onClick={handleCopy}>
          <span>💬</span>
          <span className={styles.targetLabel}>카카오톡</span>
        </button>
        <button className={styles.target} onClick={handleCopy}>
          <span>📤</span>
          <span className={styles.targetLabel}>다른 앱</span>
        </button>
        <button className={styles.target} onClick={handleCopy}>
          <span>🔗</span>
          <span className={styles.targetLabel}>링크 복사</span>
        </button>
      </div>
    </BottomSheet>
  );
};
