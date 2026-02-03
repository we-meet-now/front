// app-bar.css.ts
import { createVar, style } from '@vanilla-extract/css';

import { vars } from '../theme.css';

export const titleSizeVar = createVar();

export const appBar = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,

  height: '56px',
  backgroundColor: vars.color.white,
  borderBottom: `1px solid ${vars.color.grey200}`,
});

/* 좌 / 우 공통 */
export const side = style({
  position: 'absolute',
  top: 0,
  bottom: 0,

  display: 'flex',
  alignItems: 'center',
});

export const left = style({
  left: 12,
});

export const right = style({
  right: 12,
});

/* back 버튼 */
export const backButton = style({
  width: 36,
  height: 36,
  borderRadius: '50%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
    '&:active': {
      backgroundColor: vars.color.grey200,
    },
  },
});

export const backIcon = style({
  width: 24,
  height: 24,
  color: vars.color.grey800,
});

/* 중앙 타이틀 */
export const titleWrapper = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',

  maxWidth: '70%',
});

export const title = style({
  fontSize: titleSizeVar,
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1.2,

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const subTitle = style({
  marginTop: 2,
  fontSize: vars.fontSize.xxs,
  color: vars.color.grey500,

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
