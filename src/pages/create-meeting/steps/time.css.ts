import { style } from '@vanilla-extract/css';

import { fluid, fluidHeight, fluidText } from '@/ui/utils';

import { vars } from '@/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: fluidHeight(14, 25),
  padding: '24px 12px',
});

/* 전체 숫자 영역 */
export const numbers = style({
  display: 'flex',
  alignItems: 'center',
});

/* 원형 step */
export const step = style({
  width: fluid(36),
  height: fluid(36),
  borderRadius: '50%',
  flexShrink: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: fluidText(13, 16),
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
  fontSize: fluidText(18, 22),
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
});

export const description = style({
  fontSize: fluidText(12, 14),
  color: vars.color.grey500,
});

export const tabBox = style({
  display: 'flex',
  gap: 12,
  width: '80%',
  justifyContent: 'space-between',
});

export const tab = style({
  flex: 1,
  minWidth: 0,
  height: fluid(50),
  padding: '8px 4px',
  borderRadius: 8,
  backgroundColor: vars.color.grey100,
  border: `2px solid ${vars.color.grey500}`,
  color: vars.color.grey500,
  textAlign: 'center',
  fontSize: fluidText(12, 14),
  fontWeight: vars.fontWeight.bold,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
  fontSize: fluidText(12, 14),
  color: vars.color.black,
});

/* 공통 input */
export const input = style({
  height: 48,
  padding: '0 12px',
  borderRadius: 10,
  border: `1px solid ${vars.color.grey400}`,
  fontSize: fluidText(14, 16),

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
  boxSizing: 'border-box',
  minHeight: 48,
  backgroundColor: vars.color.blue50,
  fontSize: fluidText(12, 14),
  color: vars.color.grey800,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: vars.fontWeight.regular,
  borderRadius: 8,
  padding: '14px 16px',
  lineHeight: 1.5,
});

export const helper = style({
  fontSize: fluidText(12, 14),
  color: vars.color.grey600,
  textAlign: 'center',
});
