import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  padding: '32px 16px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const card = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: vars.color.white,
  borderRadius: 20,
  padding: '48px 24px',

  boxSizing: 'border-box',
});

export const icon = style({
  fontSize: 56,
  marginBottom: 24,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  marginBottom: 12,
});

export const description = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey600,
  textAlign: 'center',
  lineHeight: 1.5,
  marginBottom: 32,
  whiteSpace: 'pre-line',
});

export const indicator = style({
  display: 'flex',
  gap: 8,
  marginBottom: 10,
});

export const dot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: vars.color.grey300,
});

export const activeDot = style({
  width: 16,
  borderRadius: 4,
  backgroundColor: vars.color.blue500,
});

export const skipButton = style({
  marginTop: 12,

  background: 'none',
  border: 'none',

  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});
