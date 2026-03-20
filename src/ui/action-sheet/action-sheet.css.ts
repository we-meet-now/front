import { style, keyframes } from '@vanilla-extract/css';

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
  backgroundColor: vars.color.white,
  borderRadius: '16px 16px 0 0',
  padding: '8px 16px 24px',
  animation: `${slideUp} 0.25s ease`,
});

export const actionItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '16px 8px',
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey900,
  cursor: 'pointer',
  borderRadius: 10,
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});

export const actionIcon = style({
  width: 28,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const actionContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const actionLabel = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const actionDesc = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const divider = style({
  height: 1,
  backgroundColor: vars.color.grey100,
  margin: '4px 0',
});

export const cancelButton = style({
  width: '100%',
  padding: '14px 0',
  marginTop: 8,
  borderRadius: 12,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey700,
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});
