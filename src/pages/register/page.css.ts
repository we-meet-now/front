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

export const inlineField = style({
  display: 'flex',
  gap: 8,
});

export const label = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey900,
});

export const input = style({
  flex: 1,
  padding: '8px 12px',
  borderRadius: 8,
  border: `1px solid ${vars.color.grey500}`,
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

export const verifyButton = style({
  padding: '0 12px',
  height: 44,

  borderRadius: 8,
  border: `1px solid ${vars.color.green500}`,
  backgroundColor: vars.color.white,
  color: vars.color.green600,

  fontSize: vars.fontSize.s,
  cursor: 'pointer',
});

export const helperText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const verifiedText = style({
  fontSize: vars.fontSize.s,
  color: vars.color.green600,
});
