import { type ReactNode } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import * as styles from './popup.css';

type PopupProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  width?: string | number;
  height?: string | number;
};

const toCssSize = (value: string | number) => (typeof value === 'number' ? `${value}px` : value);

export const Popup = ({
  title,
  subtitle,
  children,
  footer,
  onClose,
  width = 360,
  height = 'auto',
}: PopupProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.popup}
        style={assignInlineVars({
          [styles.widthVar]: toCssSize(width),
          [styles.heightVar]: toCssSize(height),
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};
