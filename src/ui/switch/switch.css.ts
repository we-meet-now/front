import { style } from '@vanilla-extract/css';

import { vars } from '../theme.css';

export const track = style({
  width: 44,
  height: 24,
  borderRadius: 12,
  backgroundColor: vars.color.grey300,
  position: 'relative',
  cursor: 'pointer',
  transition: 'background-color 180ms ease',
  flexShrink: 0,
});

export const trackOn = style({
  backgroundColor: vars.color.blue500,
});

export const thumb = style({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: vars.color.white,
  position: 'absolute',
  top: 2,
  left: 2,
  transition: 'left 180ms ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
});

export const thumbOn = style({
  left: 22,
});
