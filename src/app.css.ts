import { vars } from './ui/theme.css';

import { style } from '@vanilla-extract/css';

export const flexContainer = style({
  display: 'flex',
  color: vars.color.grey900,
  fontSize: vars.fontSize.xxxl,
  fontWeight: vars.fontWeight.bold,
});
