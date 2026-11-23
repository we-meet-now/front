import { Button } from '../button/button';
import { Popup } from '../popup/popup';

import * as styles from './confirm-popup.css';

type ConfirmPopupProps = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 요청 중에는 버튼을 막아 중복 호출을 방지한다 */
  isPending?: boolean;
  errorMessage?: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

/** 되돌릴 수 없는 동작(나가기·삭제 등) 전에 한 번 더 묻는 팝업 */
export const ConfirmPopup = ({
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  isPending = false,
  errorMessage,
  onConfirm,
  onClose,
}: ConfirmPopupProps) => {
  // 요청 중에 바깥을 눌러 닫히면 결과를 보여줄 곳이 없어진다
  const handleClose = () => {
    if (!isPending) onClose();
  };

  return (
    <Popup title={title} subtitle={description} onClose={handleClose} width={320}>
      {errorMessage && (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      )}
      <div className={styles.buttons}>
        <Button
          size="m"
          color="white"
          className={styles.button}
          onClick={handleClose}
          disabled={isPending}
        >
          {cancelLabel}
        </Button>
        <Button size="m" className={styles.button} onClick={onConfirm} disabled={isPending}>
          {isPending ? '처리 중...' : confirmLabel}
        </Button>
      </div>
    </Popup>
  );
};
