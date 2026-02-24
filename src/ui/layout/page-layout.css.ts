import { style } from '@vanilla-extract/css';

export const wrapper = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export const content = style({
  flex: 1,
  overflowY: 'auto',
});
