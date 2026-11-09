import { keyframes, style } from '@vanilla-extract/css';

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

export const retryButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  color: 'inherit',
  fontSize: 'inherit',
  fontWeight: vars.fontWeight.bold,
  textDecoration: 'underline',
  textUnderlineOffset: 2,
  cursor: 'pointer',
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '100% 0' },
  '100%': { backgroundPosition: '-100% 0' },
});

export const skeletonCard = style({
  height: 74,
  borderRadius: 14,
  background: `linear-gradient(90deg, ${vars.color.grey100} 25%, ${vars.color.grey200} 50%, ${vars.color.grey100} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.2s ease-in-out infinite`,
});

export const cardList = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const card = style({
  display: 'flex',
  gap: 12,
  padding: '16px',
  borderRadius: 14,
  border: `1px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export const selectedCard = style({
  borderColor: vars.color.blue500,
  backgroundColor: vars.color.blue50,
});

export const cardIcon = style({
  fontSize: 28,
});

export const cardTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: 'bold',
  color: vars.color.grey900,
});

export const cardDesc = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
});

export const moreButton = style({
  width: '80%',
  marginTop: -13,
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  background: 'none',
  border: 'none',
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey600,
  cursor: 'pointer',
});

export const moreIcon = style({
  transition: 'transform 0.2s ease',
});

export const moreIconOpen = style({
  transform: 'rotate(180deg)',
});

export const directBox = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const directLabel = style({
  fontSize: vars.fontSize.s,
  fontWeight: 'bold',
});

export const directInput = style({
  height: 44,
  padding: '0 12px',
  borderRadius: 10,
  border: `1px solid ${vars.color.grey400}`,
  fontSize: vars.fontSize.m,
  color: vars.color.grey900,
  selectors: {
    '&::placeholder': {
      color: vars.color.grey400,
    },
  },
});

export const footer = style({
  width: '80%',
  display: 'flex',
  gap: 12,
});

/** l 사이즈 버튼의 최소 폭(327px)이 footer(화면의 80%)보다 커서 오른쪽으로 밀리므로 footer 폭에 맞춘다 */
export const nextButton = style({
  width: '100%',
  minWidth: '0 !important',
});
