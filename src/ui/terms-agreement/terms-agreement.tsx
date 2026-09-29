import { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import { BottomSheet } from '@/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/ui/button/button';
import { cx } from '@/ui/utils';

import * as styles from './terms-agreement.css';

export type TermsItem = {
  id: string;
  label: string;
  required: boolean;
  content?: ReactNode;
};

type TermsAgreementProps = {
  items: TermsItem[];
  agreedIds: string[];
  onChange: (agreedIds: string[]) => void;
};

type CheckboxProps = {
  checked: boolean;
  large?: boolean;
};

const Checkbox = ({ checked, large }: CheckboxProps) => (
  <span
    className={cx(
      styles.checkbox,
      large && styles.checkboxLarge,
      checked && styles.checkboxChecked,
    )}
  >
    {checked && '✓'}
  </span>
);

export const TermsAgreement = ({ items, agreedIds, onChange }: TermsAgreementProps) => {
  const [viewingItem, setViewingItem] = useState<TermsItem | null>(null);

  const allAgreed = items.length > 0 && items.every((item) => agreedIds.includes(item.id));

  const toggleAll = () => {
    onChange(allAgreed ? [] : items.map((item) => item.id));
  };

  const toggleItem = (id: string) => {
    onChange(
      agreedIds.includes(id) ? agreedIds.filter((agreedId) => agreedId !== id) : [...agreedIds, id],
    );
  };

  const agreeViewingItem = () => {
    if (viewingItem && !agreedIds.includes(viewingItem.id)) {
      onChange([...agreedIds, viewingItem.id]);
    }
    setViewingItem(null);
  };

  return (
    <div>
      <button type="button" className={styles.allRow} onClick={toggleAll} aria-pressed={allAgreed}>
        <Checkbox checked={allAgreed} large />
        <span className={styles.allLabel}>전체 동의하기</span>
      </button>

      <ul className={styles.list}>
        {items.map((item) => {
          const checked = agreedIds.includes(item.id);

          return (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemRow}>
                <button
                  type="button"
                  className={styles.itemToggle}
                  onClick={() => toggleItem(item.id)}
                  aria-pressed={checked}
                >
                  <Checkbox checked={checked} />
                  <span className={styles.itemLabel}>
                    <span className={item.required ? styles.required : styles.optional}>
                      [{item.required ? '필수' : '선택'}]
                    </span>{' '}
                    {item.label}
                  </span>
                </button>
                {item.content && (
                  <button
                    type="button"
                    className={styles.viewButton}
                    onClick={() => setViewingItem(item)}
                  >
                    보기
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* 다른 바텀시트 안에서 쓰여도 겹치지 않도록 body로 portal */}
      {viewingItem &&
        createPortal(
          <BottomSheet
            title={viewingItem.label}
            onClose={() => setViewingItem(null)}
            footer={
              <Button size="l" className={styles.fullWidthButton} onClick={agreeViewingItem}>
                동의
              </Button>
            }
          >
            <div className={styles.detail}>{viewingItem.content}</div>
          </BottomSheet>,
          document.body,
        )}
    </div>
  );
};
