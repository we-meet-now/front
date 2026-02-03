import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  background: '#FFFBEB ',
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 24px',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
  textAlign: 'center',
  marginTop: 20,
});

export const party = style({
  width: 120,
  height: 120,
  background: vars.color.blue50,
  fontSize: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  fontSize: vars.fontSize.xxxl,
  fontWeight: vars.fontWeight.bold,
  textAlign: 'center',
});

export const desc = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.regular,
  textAlign: 'center',
  color: vars.color.grey600,
});

export const content2 = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: 24,
  background: vars.color.white,
  borderRadius: 16,
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
  marginTop: 40,
});

export const title2 = style({
  fontSize: vars.fontSize.l,
  fontWeight: vars.fontWeight.bold,
});

export const step = style({
  display: 'flex',
});

export const stepNumber = style({
  width: 32,
  height: 32,
  background: vars.color.blue200,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const stepContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginLeft: 12,
});

export const stepTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
});

export const stepDesc = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.regular,
  color: vars.color.grey600,
});

export const content3 = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  background: '#FFF7ED',
  marginTop: 40,
});

export const title3 = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: '#C2410C',
});
export const desc3 = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.regular,
  color: '#C2410C',
});
