import { type ReactNode } from 'react';

import * as styles from './action-sheet.css';

export type ActionSheetItem = {
  icon: ReactNode;
  label: string;
  desc?: string;
  onClick: () => void;
};

type ActionSheetProps = {
  items: ActionSheetItem[];
  onClose: () => void;
};

export const ActionSheet = ({ items, onClose }: ActionSheetProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {items.map((item, i) => (
          <div key={i}>
            {i > 0 && <div className={styles.divider} />}
            <div className={styles.actionItem} onClick={item.onClick}>
              <span className={styles.actionIcon}>{item.icon}</span>
              <div className={styles.actionContent}>
                <span className={styles.actionLabel}>{item.label}</span>
                {item.desc && (
                  <span className={styles.actionDesc}>{item.desc}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <button className={styles.cancelButton} onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};
