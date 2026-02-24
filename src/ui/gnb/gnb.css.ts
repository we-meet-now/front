import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  height: 70,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',

  backgroundColor: vars.color.white,
  borderTop: `1px solid ${vars.color.grey200}`,

  boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
});

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,

  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,

  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export const activeItem = style({
  color: vars.color.blue500,
  fontWeight: vars.fontWeight.medium,
});

export const icon = style({
  fontSize: 20,
});

export const label = style({
  fontSize: vars.fontSize.xs,
});
