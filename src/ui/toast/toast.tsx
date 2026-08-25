import { useEffect, useRef } from 'react';

import * as styles from './toast.css';

type ToastProps = {
  title: string;
  description?: string;
  onClose: () => void;
  duration?: number;
};

export const Toast = ({ title, description, onClose, duration = 2500 }: ToastProps) => {
  // 부모가 인라인 함수를 넘겨도 타이머가 매 렌더마다 리셋되지 않도록 ref에 담아둔다
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => onCloseRef.current(), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={styles.toast} onClick={onClose} role="status">
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
};
