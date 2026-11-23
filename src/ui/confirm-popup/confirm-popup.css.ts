import { style } from '@vanilla-extract/css';

import { vars } from '../theme.css';

export const buttons = style({
  display: 'flex',
  gap: 8,
});

export const button = style({
  flex: 1,
  // Button 기본 minWidth(231px)가 팝업 폭을 넘지 않도록 푼다
  minWidth: 0,
});

export const error = style({
  margin: '0 0 12px',
  fontSize: vars.fontSize.s,
  color: vars.color.grey700,
  textAlign: 'center',
});
