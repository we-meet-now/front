// src/pages/create-meeting/steps/TypeStep.tsx
import { useState } from 'react';

import { useRecommendTypes } from '@/api/query/create-meeting';
import { Button } from '@/ui/button/button';
import { cx } from '@/ui/utils';

import type { CreateMeetingForm } from '../types';

import * as styles from './type.css';

type Props = {
  value: CreateMeetingForm;
  onChange: (v: Partial<CreateMeetingForm>) => void;
  onNext: () => void;
  onPrev: () => void;
};

export type MeetingType = {
  label: string;
  desc: string;
  emoji: string;
};

const AI_PICK: MeetingType = {
  label: '아무거나 다 좋아요',
  desc: 'AI에게 맡길게요',
  emoji: '🤖',
};

export const TypeStep = ({ value, onChange, onNext }: Props) => {
  const { data, isLoading } = useRecommendTypes(value.date, value.time);
  console.log(data);

  const [showAll, setShowAll] = useState(false);
  const recommendedTypes = data ? [AI_PICK, ...data.recommendations] : [AI_PICK];

  const visibleRecommendedTypes = showAll ? recommendedTypes : recommendedTypes.slice(0, 3);
  const canShowMore = recommendedTypes.length > 4;

  const isNextDisabled = !value.meetingType;
  const isPresetSelected = (label: string) => value.meetingType === label;

  return (
    <div className={styles.container}>
      {/* Stepper */}
      <div className={styles.numbers}>
        <div className={cx(styles.step, styles.completedStep)}>✓</div>
        <div className={cx(styles.line, styles.completedLine)} />
        <div className={cx(styles.step, styles.activeStep)}>2</div>
        <div className={styles.line} />
        <div className={styles.step}>3</div>
      </div>

      {/* Title */}
      <div className={styles.titleBox}>
        <div className={styles.title}>어떤 모임인가요? 🎉</div>
        <div className={styles.description}>모임 유형을 선택하거나 직접 입력해주세요</div>
      </div>

      {/* AI 추천 박스 */}
      <div className={styles.aiBox}>
        🤖 모임 AI 매니저의 추천
        <div className={styles.aiSub}>시간, 계절 정보를 기반으로 추천한 정보입니다.</div>
      </div>

      {/* 카드 리스트 */}
      {isLoading && <div>AI 추천 생성중...</div>}
      {visibleRecommendedTypes?.length > 0 && (
        <div className={styles.cardList}>
          {visibleRecommendedTypes.map((item) => (
            <div
              key={item.label}
              className={cx(styles.card, isPresetSelected(item.label) && styles.selectedCard)}
              onClick={() =>
                onChange({
                  meetingType: item.label,
                })
              }
            >
              <div className={styles.cardIcon}>{item.emoji}</div>
              <div>
                <div className={styles.cardTitle}>{item.label}</div>
                <div className={styles.cardDesc}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 더 보기 / 접기 */}
      {!showAll && canShowMore && recommendedTypes.length > 3 && (
        <div className={styles.moreButton} onClick={() => setShowAll(true)}>
          더 많은 모임 보기 ⌄
        </div>
      )}

      {showAll && canShowMore && (
        <div className={styles.moreButton} onClick={() => setShowAll(false)}>
          접기 ⌃
        </div>
      )}

      {/* 직접 입력 */}
      <div className={styles.directBox}>
        <div className={styles.directLabel}>직접 입력하기</div>
        <input
          className={styles.directInput}
          placeholder="예: 대학 동기 모임, 가족 식사, 스터디"
          value={value.meetingTypeMode === 'custom' ? (value.meetingType ?? '') : ''}
          onChange={(e) =>
            onChange({
              meetingTypeMode: 'custom',
              meetingType: e.target.value,
            })
          }
        />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button size="l" onClick={onNext} disabled={isNextDisabled}>
          다음
        </Button>
      </div>
    </div>
  );
};
