// src/pages/create-meeting/steps/PlaceStep.tsx
import { Button } from '@/ui/button/button';
import { cx } from '@/ui/utils';

import type { CreateMeetingForm } from '../types';

import * as styles from './place.css';

type Props = {
  value: CreateMeetingForm;
  onChange: (v: Partial<CreateMeetingForm>) => void;
  onPrev: () => void;
  onSubmit: () => void;
};

const PLACE_OPTIONS = [
  {
    key: 'now',
    title: '장소를 지금 정할게요',
    desc: '장소를 검색하거나 추천받을게요',
    emoji: '📍',
  },
  {
    key: 'vote',
    title: '채팅방에서 투표로 정할게요',
    desc: '참여자들과 함께 결정할게요',
    emoji: '📦',
  },
  {
    key: 'search',
    title: '생각해둔 곳이 있어요',
    desc: '장소를 검색해서 선택할게요',
    emoji: '🔎',
  },
  {
    key: 'ai',
    title: '아직 정하지 않았어요',
    desc: 'AI가 추천해준 장소를 볼래요',
    emoji: '❓',
  },
] as const;

export const PlaceStep = ({ value, onChange, onSubmit }: Props) => {
  const isNextDisabled = !value.placeMode;

  return (
    <div className={styles.container}>
      {/* Stepper */}
      <div className={styles.numbers}>
        <div className={cx(styles.step, styles.completedStep)}>✓</div>
        <div className={cx(styles.line, styles.completedLine)} />
        <div className={cx(styles.step, styles.completedStep)}>✓</div>
        <div className={cx(styles.line, styles.completedLine)} />
        <div className={cx(styles.step, styles.activeStep)}>3</div>
      </div>

      {/* Title */}
      <div className={styles.titleBox}>
        <div className={styles.title}>어디에서 만나나요? 📍</div>
        <div className={styles.description}>모임 장소를 선택해주세요</div>
      </div>

      {/* 옵션 카드 */}
      <div className={styles.cardList}>
        {PLACE_OPTIONS.map((item) => (
          <div
            key={item.key}
            className={cx(styles.card, value.placeMode === item.key && styles.selectedCard)}
            onClick={() => onChange({ placeMode: item.key })}
          >
            <div className={styles.cardLeft}>
              <div className={styles.icon}>{item.emoji}</div>
              <div>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={styles.cardDesc}>{item.desc}</div>
              </div>
            </div>

            {value.placeMode === item.key && <div className={styles.check}>✓</div>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button size="l" onClick={onSubmit} disabled={isNextDisabled}>
          모임 생성
        </Button>
      </div>
    </div>
  );
};
