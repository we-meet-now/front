import { useState } from 'react';

import { usePlaceSearch } from '@/api/query/create-meeting';
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

export const PlaceStep = ({ value, onChange, onSubmit }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');

  const { data, isLoading } = usePlaceSearch(
    value.date,
    value.time,
    value.meetingType,
    submittedKeyword,
  );

  const places = data ?? [];

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

      {isLoading && value.placeMode === 'ai' && (
        <div style={{ marginTop: 12 }}>🤖 AI가 추천 장소를 찾고 있어요...</div>
      )}

      {places.length > 0 && (
        <div className={styles.resultList}>
          {places.map((place) => (
            <div
              key={place.id}
              className={cx(styles.resultCard, value.place === place.name && styles.selectedResult)}
              onClick={() => onChange({ place: place.name })}
            >
              <span className={styles.resultCardTitle}>
                {value.placeMode === 'ai' && <span className={styles.aiBadge}>다양한 선택지</span>}
                {place.name}
              </span>
              <span className={styles.resultCardAddress}>{place.address}</span>
              <div className={styles.resultCardComment}>{place.comment}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <Button size="l" onClick={onSubmit} disabled={isNextDisabled}>
          모임 생성
        </Button>
      </div>
    </div>
  );
};
