import { vars } from '../theme.css';

import { style } from '@vanilla-extract/css';

export const mobileLayoutWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100dvh',
  width: '100%',
  backgroundColor: vars.color.grey200,
});

export const mobileLayoutInner = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 440,
  height: '100dvh',
  backgroundColor: vars.color.white,
});
