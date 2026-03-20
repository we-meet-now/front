import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/* ── 전체 ── */
export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

/* ── 월 네비게이션 ── */
export const monthNav = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  padding: '14px 16px',
});

export const monthLabel = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  minWidth: 120,
  textAlign: 'center',
});

export const navButton = style({
  width: 32,
  height: 32,
  borderRadius: 8,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  cursor: 'pointer',
  color: vars.color.grey700,
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});

/* ── 요일 바 ── */
export const weekdayBar = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  padding: '0 8px',
  marginBottom: 4,
});

export const weekdayCell = style({
  textAlign: 'center',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey500,
  padding: '6px 0',
});

export const weekdaySun = style({
  color: '#ef4444',
});

export const weekdaySat = style({
  color: '#3B82F6',
});

/* ── 월간 그리드 ── */
export const monthGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  padding: '0 8px',
  borderTop: `1px solid ${vars.color.grey200}`,
});

export const dayCell = style({
  aspectRatio: '0.75',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 6,
  borderBottom: `1px solid ${vars.color.grey200}`,
  borderRight: `1px solid ${vars.color.grey200}`,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  position: 'relative',

  selectors: {
    '&:nth-child(7n)': {
      borderRight: 'none',
    },
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});

export const dayCellEmpty = style({
  cursor: 'default',
  borderBottom: `1px solid ${vars.color.grey200}`,
  selectors: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export const dayCellSelected = style({
  backgroundColor: '#e0e7ff',
  outline: '2px solid #818cf8',
  outlineOffset: -2,
});

export const dayCellAllAvailable = style({
  outline: '2px solid #facc15',
  outlineOffset: -2,
});

export const dayCellConfirmed = style({
  backgroundColor: '#dbeafe',
  outline: '2px solid #3B82F6',
  outlineOffset: -2,
});

export const dayNumber = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey800,
});

export const dayNumberSun = style({
  color: '#ef4444',
});

export const dayNumberSat = style({
  color: '#3B82F6',
});

export const dayNumberOtherMonth = style({
  color: vars.color.grey300,
});

/* ── 점 (가능 표시) ── */
export const dotContainer = style({
  display: 'flex',
  gap: 2,
  marginTop: 3,
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const dot = style({
  width: 5,
  height: 5,
  borderRadius: '50%',
});

/* ── 확정 별표 ── */
export const starMark = style({
  fontSize: '10px',
  marginTop: 2,
});

/* ── 하단 안내 + 버튼 ── */
export const footer = style({
  padding: '12px 16px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  alignItems: 'center',
});

export const footerHint = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  textAlign: 'center',
});

export const confirmButton = style({
  width: '100%',
  padding: '14px 0',
  borderRadius: 12,
  border: 'none',
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blue600,
    },
  },
});
