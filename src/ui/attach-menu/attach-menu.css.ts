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
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.color.white,
  borderRadius: '16px 16px 0 0',
  padding: '10px 16px 24px',
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
  marginBottom: 10,
});

export const optionRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  width: '100%',
  padding: '14px 4px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${vars.color.grey100}`,
    },
  },
});

export const optionIcon = style({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: vars.color.blue50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  flexShrink: 0,
});

export const optionLabel = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey900,
});

export const hiddenFileInput = style({
  display: 'none',
});
