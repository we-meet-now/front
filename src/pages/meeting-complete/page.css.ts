import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
});

export const card = style({
  width: '100%',
  maxWidth: 420,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
  padding: 40,
  borderRadius: 20,
  backgroundColor: vars.color.white,
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  textAlign: 'center',
});

export const icon = style({
  fontSize: 60,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const description = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey600,
  lineHeight: 1.5,
});

export const buttonGroup = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginTop: 20,
});
