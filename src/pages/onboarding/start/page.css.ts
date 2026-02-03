import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  background: '#FFFBEB ',
  display: 'flex',
  flexDirection: 'column',
  padding: '80px 24px',
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
});

export const box = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 32,
  cursor: 'pointer',

  marginTop: 20,
});

export const option = style({
  width: 342,
  height: 236,
  background: vars.color.white,
  borderRadius: 16,
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,

  selectors: {
    '&:hover': {
      border: `2px solid ${vars.color.blue500}`,
    },
  },
});

export const star = style({
  width: 80,
  height: 80,
  background: '#FFEDD5',
  fontSize: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const optionTitle = style({
  fontSize: vars.fontSize.l,
  fontWeight: vars.fontWeight.bold,
});

export const optionDesc = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.regular,
  color: vars.color.grey500,
  textAlign: 'center',
  lineHeight: 1.5,
});

export const hand = style({
  width: 80,
  height: 80,
  background: '#DBEAFE',
  fontSize: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
