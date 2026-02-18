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
  fontWeight: 'bold',
});

export const description = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
});

export const tabBox = style({
  display: 'flex',
  gap: 12,
  width: '80%',
  justifyContent: 'space-between',
});

export const tab = style({
  width: 145,
  height: 50,
  padding: '8px 0',
  borderRadius: 8,
  backgroundColor: vars.color.grey100,
  border: `2px solid ${vars.color.grey500}`,
  color: vars.color.grey500,
  textAlign: 'center',
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  cursor: 'pointer',
});

export const activeTab = style({
  border: `2px solid ${vars.color.blue500}`,
  color: vars.color.blue500,
});

/* 날짜+시간 전체 묶음 */
export const dateTimeBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '80%',
  marginBottom: 32,
});

/* 개별 필드 */
export const field = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

/* 라벨 */
export const label = style({
  fontSize: vars.fontSize.s,
  color: vars.color.black,
});

/* 공통 input */
export const input = style({
  height: 48,
  padding: '0 12px',
  borderRadius: 10,
  border: `1px solid ${vars.color.grey400}`,
  fontSize: vars.fontSize.m,

  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.blue500,
    },
  },
});

/* 직접 입력 모드 안내 */
export const customBox = style({
  width: '80%',
  marginBottom: 32,
  height: 48,
  backgroundColor: vars.color.blue50,
  fontSize: vars.fontSize.s,
  color: vars.color.grey800,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: vars.fontWeight.regular,
  borderRadius: 8,
  padding: 18,
});

export const helper = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey600,
});
