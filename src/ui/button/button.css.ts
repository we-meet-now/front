// button.css.ts
import { createVar, style } from '@vanilla-extract/css';

import { vars } from '../theme.css';

// props로 주입할 CSS 변수들
export const heightVar = createVar();
export const paddingXVar = createVar();
export const minWidthVar = createVar();
export const bgColorVar = createVar();
export const textColorVar = createVar();

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',

  height: heightVar,
  minWidth: minWidthVar,
  padding: `0 ${paddingXVar}`,

  backgroundColor: bgColorVar,
  color: textColorVar,

  border: 'none',
  borderRadius: '8px',

  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',

  fontWeight: vars.fontWeight.medium,

  transition: 'opacity 120ms ease',

  selectors: {
    '&:hover': {
      opacity: 0.9,
    },
    '&:active': {
      opacity: 0.85,
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.blue300}`,
      outlineOffset: '2px',
    },
  },
});
