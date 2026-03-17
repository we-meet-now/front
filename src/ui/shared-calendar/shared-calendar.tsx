import { useState } from 'react';

import { Button } from '@/ui/button/button';
import { cx } from '@/ui/utils';

import * as styles from './shared-calendar.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type MemberAvailability = {
  name: string;
  color: string;
  dates: number[]; // day numbers
};

type SharedCalendarProps = {
  confirmedDate?: number | null;
  onConfirm?: (selectedDates: number[]) => void;
};

// 나(도희)의 정보
const MY_INFO = { name: '도희', color: '#3B82F6' };

// 목업: 다른 멤버들의 가능 일자
const OTHER_MEMBERS_AVAILABILITY: MemberAvailability[] = [
  { name: '민지', color: '#e53935', dates: [5, 12, 15, 19, 26] },
  { name: '수현', color: '#fb8c00', dates: [5, 8, 15, 22, 26] },
  { name: '지원', color: '#7c3aed', dates: [5, 15, 19, 22] },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export const SharedCalendar = ({
  confirmedDate = null,
  onConfirm,
}: SharedCalendarProps) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDates, setSelectedDates] = useState<Set<number>>(new Set());
  const [confirmedDates, setConfirmedDates] = useState<Set<number>>(new Set());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const toggleDate = (day: number) => {
    if (confirmedDate || confirmedDates.size > 0) return; // 확정 후에는 선택 불가
    setSelectedDates((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
  };

  // 확정된 내 일정 + 다른 멤버 합쳐서 전체 가용 목록 생성
  const allMembers: MemberAvailability[] = [
    { ...MY_INFO, dates: Array.from(confirmedDates) },
    ...OTHER_MEMBERS_AVAILABILITY,
  ];

  // 모든 멤버가 가능한 날
  const allAvailableDays = Array.from({ length: daysInMonth }, (_, i) => i + 1).filter(
    (day) => allMembers.every((m) => m.dates.includes(day)),
  );

  // 특정 날짜에 가능한 멤버 목록
  const getAvailableMembers = (day: number) =>
    allMembers.filter((m) => m.dates.includes(day));

  const hintText = confirmedDate
    ? '확정일자는 별표 표시돼요!'
    : confirmedDates.size > 0
      ? allAvailableDays.length > 0
        ? '모두가 만남이 가능한 일정은 노란색 테두리가 생겨요!'
        : '만남이 가능한 일정은 점으로 표시돼요!'
      : '만남이 가능한 일정을 선택해주세요';

  return (
    <div className={styles.container}>
      {/* ── 월 네비게이션 ── */}
      <div className={styles.monthNav}>
        <button className={styles.navButton} onClick={handlePrevMonth}>
          ◀
        </button>
        <span className={styles.monthLabel}>
          {year}년 {month + 1}월
        </span>
        <button className={styles.navButton} onClick={handleNextMonth}>
          ▶
        </button>
      </div>

      {/* ── 요일 바 ── */}
      <div className={styles.weekdayBar}>
        {WEEKDAYS.map((wd, i) => (
          <div
            key={wd}
            className={cx(
              styles.weekdayCell,
              i === 0 && styles.weekdaySun,
              i === 6 && styles.weekdaySat,
            )}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* ── 달력 그리드 ── */}
      <div className={styles.monthGrid}>
        {/* 빈 칸 */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className={cx(styles.dayCell, styles.dayCellEmpty)} />
        ))}

        {/* 날짜 */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dayOfWeek = (firstDay + day - 1) % 7;
          const isSelected = selectedDates.has(day);
          const isAllAvailable = allAvailableDays.includes(day);
          const isConfirmed = confirmedDate === day;
          const availableMembers = getAvailableMembers(day);

          return (
            <div
              key={day}
              className={cx(
                styles.dayCell,
                isSelected && styles.dayCellSelected,
                isAllAvailable && !isConfirmed && styles.dayCellAllAvailable,
                isConfirmed && styles.dayCellConfirmed,
              )}
              onClick={() => toggleDate(day)}
            >
              <span
                className={cx(
                  styles.dayNumber,
                  dayOfWeek === 0 && styles.dayNumberSun,
                  dayOfWeek === 6 && styles.dayNumberSat,
                )}
              >
                {day}
              </span>

              {/* 가능 멤버 점 */}
              {availableMembers.length > 0 && (
                <div className={styles.dotContainer}>
                  {availableMembers.map((m) => (
                    <div
                      key={m.name}
                      className={styles.dot}
                      style={{ backgroundColor: m.color }}
                    />
                  ))}
                </div>
              )}

              {/* 확정 별표 */}
              {isConfirmed && <span className={styles.starMark}>⭐</span>}
            </div>
          );
        })}
      </div>

      {/* ── 하단 ── */}
      <div className={styles.footer}>
        <span className={styles.footerHint}>{hintText}</span>
        <Button
          size="l"
          color="blue"
          onClick={() => {
            if (confirmedDates.size > 0) {
              // 날짜 변경하기 → 초기화
              setConfirmedDates(new Set());
              setSelectedDates(new Set());
            } else {
              // 일정 선택하기 → 확정
              setConfirmedDates(new Set(selectedDates));
              onConfirm?.(Array.from(selectedDates));
            }
          }}
          style={{ width: '100%' }}
        >
          {confirmedDates.size > 0 ? '날짜 변경하기' : '일정 선택하기'}
        </Button>
      </div>
    </div>
  );
};
