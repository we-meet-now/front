import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 100,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  animation: `${fadeIn} 0.2s ease`,
});

export const sheet = style({
  width: '100%',
  maxWidth: 440,
  height: '75vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.color.white,
  borderRadius: '16px 16px 0 0',
  padding: '10px 16px 20px',
  animation: `${slideUp} 0.25s ease`,
});

export const grabber = style({
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: vars.color.grey200,
  margin: '0 auto 14px',
  flexShrink: 0,
});

export const title = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  marginBottom: 14,
  flexShrink: 0,
});

export const searchInput = style({
  width: '100%',
  height: 46,
  boxSizing: 'border-box',
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 8,
  padding: '0 14px',
  fontSize: vars.fontSize.m,
  color: vars.color.grey900,
  backgroundColor: vars.color.grey100,
  outline: 'none',
  flexShrink: 0,
  selectors: {
    '&:focus': {
      borderColor: vars.color.grey900,
    },
    '&::placeholder': {
      color: vars.color.grey400,
    },
  },
});

export const myLocationButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  padding: '13px 4px',
  marginTop: 6,
  border: 'none',
  borderBottom: `1px solid ${vars.color.grey100}`,
  backgroundColor: 'transparent',
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.blue600,
  cursor: 'pointer',
  textAlign: 'left',
  flexShrink: 0,
  selectors: {
    '&:disabled': {
      color: vars.color.grey400,
      cursor: 'default',
    },
  },
});

export const locationError = style({
  fontSize: vars.fontSize.xxs,
  color: '#E11D48',
  marginTop: -2,
  marginBottom: 4,
  flexShrink: 0,
});

export const resultList = style({
  flex: 1,
  overflowY: 'auto',
  marginTop: 4,
});

export const resultRow = style({
  padding: '13px 4px',
  borderBottom: `1px solid ${vars.color.grey100}`,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});

export const resultName = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const resultAddr = style({
  marginTop: 2,
  fontSize: vars.fontSize.xxs,
  color: vars.color.grey500,
});

export const emptyText = style({
  padding: '32px 0',
  textAlign: 'center',
  fontSize: vars.fontSize.xs,
  color: vars.color.grey400,
});
