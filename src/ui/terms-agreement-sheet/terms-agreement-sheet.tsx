import { useState } from 'react';

import { BottomSheet } from '@/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/ui/button/button';
import { TermsAgreement, type TermsItem } from '@/ui/terms-agreement/terms-agreement';
import { fullWidthButton } from '@/ui/terms-agreement/terms-agreement.css';
import { isRequiredTermsAgreed } from '@/ui/terms-agreement/utils';

type TermsAgreementSheetProps = {
  title?: string;
  items: TermsItem[];
  confirmLabel?: string;
  onConfirm: (agreedIds: string[]) => void;
  onClose: () => void;
};

// 입력 폼 없이 바로 가입하는 흐름(소셜 로그인 등)에서 쓰는 바텀시트 버전
export const TermsAgreementSheet = ({
  title = '서비스 이용 동의',
  items,
  confirmLabel = '동의하고 계속하기',
  onConfirm,
  onClose,
}: TermsAgreementSheetProps) => {
  const [agreedIds, setAgreedIds] = useState<string[]>([]);

  return (
    <BottomSheet
      title={title}
      onClose={onClose}
      footer={
        <Button
          size="l"
          className={fullWidthButton}
          disabled={!isRequiredTermsAgreed(items, agreedIds)}
          onClick={() => onConfirm(agreedIds)}
        >
          {confirmLabel}
        </Button>
      }
    >
      <TermsAgreement items={items} agreedIds={agreedIds} onChange={setAgreedIds} />
    </BottomSheet>
  );
};
