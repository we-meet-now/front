// src/pages/create-meeting/steps/TypeStep.tsx
import { useState } from 'react';

import { useRecommendTypes } from '@/api/query/create-meeting';
import { Button } from '@/ui/button/button';
import { cx } from '@/ui/utils';

import type { CreateMeetingForm } from '../types';

import * as aiStyles from './ai-status.css';
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

/** 접힌 상태에서 보여줄 추천 카드 수 */
const COLLAPSED_COUNT = 3;

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AI_PICK: MeetingType = {
  label: '아무거나 다 좋아요',
  desc: 'AI에게 맡길게요',
  emoji: '🤖',
};

export const TypeStep = ({ value, onChange, onNext }: Props) => {
  const { data, isLoading, isError, isFetching, refetch } = useRecommendTypes(
    value.date,
    value.time,
  );

  const [showAll, setShowAll] = useState(false);
  const recommendedTypes = data ? [AI_PICK, ...data] : [AI_PICK];

  const visibleRecommendedTypes = showAll
    ? recommendedTypes
    : recommendedTypes.slice(0, COLLAPSED_COUNT);
  const hiddenCount = recommendedTypes.length - COLLAPSED_COUNT;
  const canShowMore = hiddenCount > 0;
  // 다시 시도 중에도 진행 중으로 보여준다
  const isRecommending = isLoading || (isError && isFetching);

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

      {/* AI 추천 박스: 진행 중 / 완료 / 실패 상태를 함께 보여준다 */}
      <div className={aiStyles.aiBox} aria-live="polite">
        <div className={aiStyles.aiHeader}>
          <span>🤖 모임 AI 매니저의 추천</span>
          {isRecommending && (
            <span className={cx(aiStyles.statusBadge, aiStyles.statusLoading)}>
              <span className={aiStyles.spinner} aria-hidden />
              추천 중
            </span>
          )}
          {!isRecommending && data && (
            <span className={cx(aiStyles.statusBadge, aiStyles.statusDone)}>✓ 추천 완료</span>
          )}
          {!isRecommending && isError && (
            <span className={cx(aiStyles.statusBadge, aiStyles.statusError)}>추천 실패</span>
          )}
        </div>
        <div className={aiStyles.aiSub}>
          {isRecommending && '시간, 계절 정보를 바탕으로 어울리는 모임을 찾고 있어요...'}
          {!isRecommending && data && `시간, 계절 정보를 바탕으로 ${data.length}개를 추천했어요.`}
          {!isRecommending && isError && (
            <>
              추천을 불러오지 못했어요. 직접 입력하거나{' '}
              <button type="button" className={styles.retryButton} onClick={() => refetch()}>
                다시 시도
              </button>
              해 주세요.
            </>
          )}
        </div>
      </div>

      {/* 카드 리스트 */}
      {visibleRecommendedTypes.length > 0 && (
        <div className={styles.cardList}>
          {visibleRecommendedTypes.map((item) => (
            <div
              key={item.label}
              className={cx(styles.card, isPresetSelected(item.label) && styles.selectedCard)}
              onClick={() =>
                onChange({
                  // 직접 입력값이 남아 입력창에 카드 이름이 보이지 않도록 모드도 함께 바꾼다
                  meetingTypeMode: 'preset',
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
          {/* 추천을 받는 동안 카드가 들어올 자리를 미리 보여준다 */}
          {isRecommending &&
            Array.from({ length: COLLAPSED_COUNT - 1 }, (_, i) => (
              <div key={i} className={styles.skeletonCard} aria-hidden />
            ))}
        </div>
      )}

      {/* 더 보기 / 접기 */}
      {canShowMore && (
        <button
          type="button"
          className={styles.moreButton}
          onClick={() => setShowAll((prev) => !prev)}
          aria-expanded={showAll}
        >
          {showAll ? '접기' : `더 많은 모임 보기 (${hiddenCount})`}
          <ChevronIcon className={cx(styles.moreIcon, showAll && styles.moreIconOpen)} />
        </button>
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
        <Button size="l" onClick={onNext} disabled={isNextDisabled} className={styles.nextButton}>
          다음
        </Button>
      </div>
    </div>
  );
};
