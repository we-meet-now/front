import { Button } from '@/ui/button/button';
import { cx } from '@/ui/utils';

import type { CreateMeetingForm } from '../types';

import * as styles from './time.css';

type Props = {
  value: CreateMeetingForm;
  onChange: (v: Partial<CreateMeetingForm>) => void;
  onNext: () => void;
};

export const TimeStep = ({ value, onChange, onNext }: Props) => {
  const timeType = value.timeType ?? 'date';
  const isDateValid = Boolean(value.date && value.time);

  const isNextDisabled = timeType === 'date' ? !isDateValid : false; // custom이면 항상 가능

  return (
    <div className={styles.container}>
      <div className={styles.numbers}>
        <div className={cx(styles.step, styles.activeStep)}>1</div>
        <div className={styles.line} />
        <div className={styles.step}>2</div>
        <div className={styles.line} />
        <div className={styles.step}>3</div>
      </div>
      <div className={styles.titleBox}>
        <div className={styles.title}>주최자님, 언제 모이나요? 🗓️</div>
        <div className={styles.description}>모임 날짜와 시간을 선택해주세요</div>
      </div>

      {/* 탭 선택 */}
      <div className={styles.tabBox}>
        <button
          className={cx(styles.tab, timeType === 'date' && styles.activeTab)}
          onClick={() => onChange({ timeType: 'date' })}
        >
          날짜가 정해졌어요
        </button>
        <button
          className={cx(styles.tab, timeType === 'custom' && styles.activeTab)}
          onClick={() => onChange({ timeType: 'custom' })}
        >
          날짜를 정할래요
        </button>
      </div>

      {/* 날짜 선택 */}
      {timeType === 'date' && (
        <div className={styles.dateTimeBox}>
          <div className={styles.field}>
            <label className={styles.label}>날짜 선택</label>
            <input
              type="date"
              className={styles.input}
              value={value.date ?? ''}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>시간 선택</label>
            <input
              type="time"
              className={styles.input}
              value={value.time ?? ''}
              onChange={(e) => onChange({ time: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* 직접 입력 */}
      {timeType === 'custom' && (
        <div className={styles.customBox}>
          <div className={styles.helper}>
            💡 참여자들에게 가능한 날짜를 물어보고, 투표로 최종날짜를 결정할 수 있어요!
          </div>
        </div>
      )}

      <Button size="l" onClick={onNext} disabled={isNextDisabled}>
        다음
      </Button>
    </div>
  );
};
