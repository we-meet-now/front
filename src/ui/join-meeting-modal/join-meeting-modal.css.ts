import { keyframes, style } from '@vanilla-extract/css';

import { fluidText } from '@/ui/utils';

import { vars } from '@/ui/theme.css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const popIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  zIndex: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 24px',
  animation: `${fadeIn} 0.2s ease`,
});

export const card = style({
  position: 'relative',
  width: '100%',
  maxWidth: 320,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.color.white,
  borderRadius: 24,
  padding: '32px 24px 24px',
  animation: `${popIn} 0.2s ease`,
});

export const closeButton = style({
  position: 'absolute',
  top: 16,
  right: 16,
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  color: vars.color.grey400,
  fontSize: 18,
  cursor: 'pointer',
  selectors: {
    '&:hover': { color: vars.color.grey700 },
  },
});

export const icon = style({
  width: 56,
  height: 56,
  borderRadius: '50%',
  backgroundColor: vars.color.blue50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 26,
  marginBottom: 16,
});

export const title = style({
  fontSize: fluidText(18, 20),
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  textAlign: 'center',
});

export const subtitle = style({
  marginTop: 6,
  fontSize: fluidText(13, 14),
  color: vars.color.grey500,
  textAlign: 'center',
});

export const input = style({
  width: '100%',
  height: 48,
  boxSizing: 'border-box',
  marginTop: 20,
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 10,
  padding: '0 16px',
  fontSize: fluidText(14, 16),
  color: vars.color.grey900,
  backgroundColor: vars.color.grey100,
  outline: 'none',
  textAlign: 'center',
  selectors: {
    '&:focus': {
      borderColor: vars.color.blue500,
      backgroundColor: vars.color.white,
    },
    '&::placeholder': {
      color: vars.color.grey400,
    },
  },
});

export const submitButton = style({
  width: '100%',
  height: 48,
  marginTop: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  border: 'none',
  borderRadius: 10,
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: fluidText(14, 16),
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'opacity 120ms ease',
  selectors: {
    '&:hover': { opacity: 0.9 },
    '&:active': { opacity: 0.85 },
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  },
});

export const footer = style({
  marginTop: 18,
  fontSize: fluidText(12, 13),
  color: vars.color.grey500,
  textAlign: 'center',
});

export const footerLink = style({
  border: 'none',
  background: 'none',
  padding: 0,
  marginLeft: 4,
  fontSize: 'inherit',
  fontWeight: vars.fontWeight.medium,
  color: vars.color.blue500,
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: 2,
});
