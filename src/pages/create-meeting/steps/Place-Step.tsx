import { useState } from 'react';

import { describePlaceSearchError } from '@/api/create-meeting/place';
import { usePlaceSearch } from '@/api/query/create-meeting';
import { Button } from '@/ui/button/button';
import { cx } from '@/ui/utils';

import type { CreateMeetingForm } from '../types';

import * as aiStyles from './ai-status.css';
import * as styles from './place.css';

type Props = {
  value: CreateMeetingForm;
  onChange: (v: Partial<CreateMeetingForm>) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

const PLACE_OPTIONS = [
  {
    key: 'search',
    title: '생각해둔 곳이 있어요',
    desc: '장소를 검색해서 선택할게요',
    emoji: '🔎',
  },
  {
    key: 'ai',
    title: '아직 정하지 않았어요',
    desc: '지금 추천받아 볼래요',
    emoji: '❓',
  },
  {
    key: 'vote',
    title: '채팅방에서 투표로 정할게요',
    desc: '참여자들과 함께 결정해요',
    emoji: '📦',
  },
] as const;

type PlaceMode = (typeof PLACE_OPTIONS)[number]['key'];

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/** "2026-12-01" → "12월 1일 (화)". new Date("YYYY-MM-DD")는 UTC로 해석돼 날짜가 밀릴 수 있어 로컬 기준으로 만든다 */
const formatDate = (date: string) => {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return date;
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${m}월 ${d}일 (${weekday})`;
};

/** 1단계에서 날짜·시간 중 하나만 정할 수도 있어 빠진 쪽은 '미정'으로 보여준다 */
const formatSchedule = ({ timeType, date, time }: CreateMeetingForm) => {
  if (timeType === 'custom' || (!date && !time)) return '채팅방에서 투표로 정해요';
  return [date ? formatDate(date) : '날짜 미정', time || '시간 미정'].join(' · ');
};

export const PlaceStep = ({ value, onChange, onPrev, onSubmit, isSubmitting }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');

  const { data, isLoading, isError, error, isFetching, refetch } = usePlaceSearch(
    value.date,
    value.time,
    value.meetingType,
    submittedKeyword,
  );

  const places = data ?? [];
  const errorInfo = isError ? describePlaceSearchError(error) : null;
  // 검색이 끝났는데 결과가 비어 있는 경우도 안내해야 사용자가 다음 행동을 알 수 있다
  const isEmptyResult = !!submittedKeyword && !isFetching && !isError && data?.length === 0;

  const isNextDisabled = value.placeMode === 'vote' ? false : !value.place;

  const handleOptionClick = (key: PlaceMode) => {
    onChange({ placeMode: key, place: undefined });
    setSearchKeyword('');
    setSubmittedKeyword('');
  };

  const handleSearch = () => {
    if (!searchKeyword.trim()) return;
    // ai 모드만 api 호출, search 모드는 검색어 기반으로 장소 리스트 필터링 (추후 구현)
    if (value.placeMode === 'search') {
      // search 모드의 장소 리스트 필터링 로직 구현
      alert('검색 모드는 아직 구현되지 않았습니다. AI 추천 모드를 이용해주세요.');
      return;
    }

    onChange({ place: undefined });
    setSubmittedKeyword(searchKeyword.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.numbers}>
        <div className={cx(styles.step, styles.completedStep)}>✓</div>
        <div className={cx(styles.line, styles.completedLine)} />
        <div className={cx(styles.step, styles.completedStep)}>✓</div>
        <div className={cx(styles.line, styles.completedLine)} />
        <div className={cx(styles.step, styles.activeStep)}>3</div>
      </div>

      <div className={styles.titleBox}>
        <div className={styles.title}>어디에서 만나나요? 📍</div>
        <div className={styles.description}>모임 장소를 선택해주세요</div>
      </div>

      {/* 앞 단계에서 고른 내용. 장소 추천도 이 값을 기준으로 한다 */}
      <div className={styles.summaryBox}>
        {/* 변경 버튼을 제목 줄에 두어 아래 값들이 영역 폭을 모두 쓰게 한다 */}
        <div className={styles.summaryHeader}>
          <span className={styles.summaryTitle}>선택한 내용</span>
          <button type="button" className={styles.summaryEdit} onClick={onPrev}>
            변경
          </button>
        </div>
        <dl className={styles.summaryList}>
          <div className={styles.summaryRow}>
            <dt className={styles.summaryLabel}>모임 유형</dt>
            <dd className={styles.summaryValue}>{value.meetingType}</dd>
          </div>
          <div className={styles.summaryRow}>
            <dt className={styles.summaryLabel}>일정</dt>
            <dd className={styles.summaryValue}>{formatSchedule(value)}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.cardList}>
        {PLACE_OPTIONS.map((item) => (
          <div
            key={item.key}
            className={cx(styles.card, value.placeMode === item.key && styles.selectedCard)}
            onClick={() => handleOptionClick(item.key)}
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

      {(value.placeMode === 'search' || value.placeMode === 'ai') && (
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            placeholder={
              value.placeMode === 'ai' ? 'AI에게 추천받을 지역을 입력하세요' : '장소를 입력하세요'
            }
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Button
            size="xs"
            className={styles.searchButton}
            onClick={handleSearch}
            disabled={isLoading || !searchKeyword.trim()}
          >
            {isLoading ? '검색중...' : '검색'}
          </Button>
        </div>
      )}

      {/* 2단계와 같은 AI 추천 박스로 진행 중/완료 상태를 보여준다. 실패·빈 결과는 아래 안내 박스가 맡는다 */}
      {value.placeMode === 'ai' && submittedKeyword && (isFetching || places.length > 0) && (
        <div className={aiStyles.aiBox} aria-live="polite">
          <div className={aiStyles.aiHeader}>
            <span>🤖 모임 AI 매니저의 추천</span>
            {isFetching ? (
              <span className={cx(aiStyles.statusBadge, aiStyles.statusLoading)}>
                <span className={aiStyles.spinner} aria-hidden />
                추천 중
              </span>
            ) : (
              <span className={cx(aiStyles.statusBadge, aiStyles.statusDone)}>✓ 추천 완료</span>
            )}
          </div>
          <div className={aiStyles.aiSub}>
            {isFetching
              ? `${submittedKeyword} 근처에서 모임에 어울리는 장소를 찾고 있어요...`
              : `${submittedKeyword} 근처에서 모임 유형과 일정에 맞는 ${places.length}곳을 골랐어요.`}
          </div>
        </div>
      )}

      {errorInfo && !isFetching && (
        <div className={styles.feedbackBox} role="alert">
          <div className={styles.feedbackTitle}>{errorInfo.title}</div>
          <div className={styles.feedbackDesc}>{errorInfo.description}</div>
          <button type="button" className={styles.retryButton} onClick={() => refetch()}>
            다시 시도
          </button>
        </div>
      )}

      {isEmptyResult && (
        <div className={styles.feedbackBox} role="status">
          <div className={styles.feedbackTitle}>추천할 장소가 없어요</div>
          <div className={styles.feedbackDesc}>근처 역이나 동네 이름으로 다시 검색해 주세요</div>
        </div>
      )}

      {places.length > 0 && !isFetching && (
        <div className={styles.resultList}>
          {places.map((place) => (
            <div
              key={place.id}
              className={cx(styles.resultCard, value.place === place.name && styles.selectedResult)}
              onClick={() => onChange({ place: place.name })}
            >
              <span className={styles.resultCardTitle}>
                {/* 서버가 업종을 내려줄 때만 배지로 보여준다. 모든 카드에 같은 문구를 붙이면 정보가 되지 않는다 */}
                {place.category && <span className={styles.aiBadge}>{place.category}</span>}
                {place.name}
              </span>
              <span className={styles.resultCardAddress}>{place.address}</span>
              {place.comment && (
                <div className={styles.resultCardComment}>
                  <span className={styles.commentLabel}>추천 이유</span>
                  {place.comment}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <Button
          size="l"
          onClick={onSubmit}
          disabled={isNextDisabled || isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? '생성 중...' : '모임 생성'}
        </Button>
      </div>
    </div>
  );
};
