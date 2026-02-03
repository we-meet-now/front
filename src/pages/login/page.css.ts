// login-page.css.ts
import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  padding: '38px 16px',

  display: 'flex',
  justifyContent: 'center',
});

export const card = style({
  width: '100%',
  maxWidth: 360,

  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  marginBottom: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

export const title = style({
  fontSize: vars.fontSize.xxxl,
  fontWeight: vars.fontWeight.bold,
  marginBottom: 8,
});

export const description = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey600,
  lineHeight: 1.4,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const label = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey900,
});

export const input = style({
  height: 44,
  padding: '0 12px',

  borderRadius: 8,
  border: `1px solid ${vars.color.grey400}`,

  fontSize: vars.fontSize.m,

  selectors: {
    '&::placeholder': {
      color: vars.color.grey400,
    },

    '&:focus': {
      outline: 'none',
      borderColor: vars.color.green500,
    },
  },
});

export const loginButton = style({
  marginTop: 8,
  height: 48,

  borderRadius: 10,
  border: 'none',

  backgroundColor: vars.color.blue500,
  color: vars.color.white,

  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.medium,

  cursor: 'pointer',

  selectors: {
    '&:hover': {
      opacity: 0.9,
    },
  },
});

export const signupText = style({
  marginTop: 20,

  textAlign: 'center',
  fontSize: vars.fontSize.s,
  color: vars.color.grey600,
});

export const signupButton = style({
  background: 'none',
  border: 'none',
  padding: 0,

  marginLeft: 4,
  color: vars.color.blue500,
  fontSize: vars.fontSize.s,
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
