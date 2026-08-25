import { type ReactNode } from 'react';

import * as styles from './bottom-sheet.css';

type BottomSheetProps = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
};

export const BottomSheet = ({ title, children, footer, onClose }: BottomSheetProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            <button className={styles.closeButton} onClick={onClose} aria-label="닫기">
              ✕
            </button>
          </div>
        )}
        {children}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};
