import { vars } from '@/ui/theme.css';

import { style } from '@vanilla-extract/css';

export const onboarding = style({
  background: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
});

export const logo = style({
  display: 'flex',
  justifyContent: 'center',
});

export const title = style({
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.xxxl,
  textAlign: 'center',
});

export const subtitle = style({
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.regular,
  fontSize: vars.fontSize.m,
  textAlign: 'center',
});

export const cardBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 35,
});

export const card = style({
  background: vars.color.white,
  width: 327,
  height: 165,
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const cardIcon = style({
  fontSize: '24px',
});

export const cardTitle = style({
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.l,
});

export const cardDesc = style({
  color: vars.color.grey500,
  fontSize: vars.fontSize.s,
});
