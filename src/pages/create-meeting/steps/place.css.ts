import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 25,
  padding: '24px 12px',
});

/* 전체 숫자 영역 */
export const numbers = style({
  display: 'flex',
  alignItems: 'center',
});

/* 원형 step */
export const step = style({
  width: 36,
  height: 36,
  borderRadius: '50%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,

  backgroundColor: vars.color.grey300,
  color: vars.color.grey700,

  transition: 'all 0.2s ease',
});

/* 현재 스텝 (파란색) */
export const activeStep = style({
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
});

/* 완료된 스텝 (초록색) */
export const completedStep = style({
  backgroundColor: vars.color.green500,
  color: vars.color.white,
});

/* 연결선 */
export const line = style({
  width: 40,
  height: 2,
  backgroundColor: vars.color.grey300,
  margin: '0 8px',
});

/* 완료된 연결선 */
export const completedLine = style({
  backgroundColor: vars.color.green500,
});

export const titleBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '80%',
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
});

export const description = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
});

export const cardList = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const card = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '18px',
  borderRadius: 16,
  border: `1px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export const selectedCard = style({
  backgroundColor: vars.color.blue500,
  borderColor: vars.color.blue500,
  color: vars.color.white,
});

export const cardLeft = style({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
});

export const icon = style({
  fontSize: 26,
});

export const cardTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
});

export const cardDesc = style({
  fontSize: vars.fontSize.s,
  opacity: 0.8,
});

export const check = style({
  fontSize: 18,
  fontWeight: vars.fontWeight.bold,
});

export const footer = style({
  width: '80%',
  display: 'flex',
  gap: 12,
});

export const searchBox = style({
  width: '80%',
  display: 'flex',
  gap: 8,
});

export const searchInput = style({
  flex: 1,
  height: 40,
  padding: '0 12px',
  borderRadius: 8,
  border: `1px solid ${vars.color.grey400}`,
});

export const searchButton = style({
  height: 40,
});

export const resultList = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const resultCard = style({
  padding: '12px',
  borderRadius: 12,
  border: `1px solid ${vars.color.grey300}`,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const aiBadge = style({
  padding: '2px 6px',
  borderRadius: 4,
  backgroundColor: vars.color.green100,
  color: vars.color.green900,
  fontSize: vars.fontSize.xxs,
  marginRight: 6,
});

export const resultCardTitle = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
});
export const resultCardAddress = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});
export const resultCardComment = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey700,
});

export const selectedResult = style({
  borderColor: vars.color.blue500,
  backgroundColor: vars.color.blue50,
});

export const feedbackBox = style({
  width: '80%',
  padding: 16,
  borderRadius: 12,
  backgroundColor: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  textAlign: 'center',
});

export const feedbackTitle = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const feedbackDesc = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey600,
});

export const retryButton = style({
  marginTop: 8,
  padding: '6px 14px',
  borderRadius: 999,
  border: `1px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey700,
  cursor: 'pointer',
});

/** l 사이즈 버튼의 최소 폭(327px)이 footer(화면의 80%)보다 커서 오른쪽으로 밀리므로 footer 폭에 맞춘다 */
export const submitButton = style({
  width: '100%',
  minWidth: '0 !important',
});

export const summaryBox = style({
  width: '80%',
  padding: '12px 16px',
  borderRadius: 12,
  backgroundColor: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const summaryHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const summaryTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey600,
});

export const summaryList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const summaryRow = style({
  display: 'flex',
  gap: 12,
  fontSize: vars.fontSize.s,
});

export const summaryLabel = style({
  flexShrink: 0,
  width: 56,
  color: vars.color.grey500,
});

export const summaryValue = style({
  minWidth: 0,
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.medium,
  // 좁은 화면에서도 일정이 잘리지 않도록 단어 단위로 줄바꿈한다
  wordBreak: 'keep-all',
});

/** 제목 줄 높이를 늘리지 않도록 테두리 없는 텍스트 버튼으로 둔다 */
export const summaryEdit = style({
  padding: '2px 0',
  background: 'none',
  border: 'none',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.blue500,
  textDecoration: 'underline',
  textUnderlineOffset: 2,
  cursor: 'pointer',
});

export const commentLabel = style({
  marginRight: 6,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.green700,
});
