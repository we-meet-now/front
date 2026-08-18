import * as styles from './toast.css';

type ToastProps = {
  message: string;
};

export const Toast = ({ message }: ToastProps) => <div className={styles.toast}>{message}</div>;
