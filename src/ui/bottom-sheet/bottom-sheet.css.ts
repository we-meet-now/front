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
  position: 'relative',
  width: '100%',
  maxWidth: 440,
  maxHeight: '85vh',
  overflowY: 'auto',
  backgroundColor: vars.color.white,
  borderRadius: '16px 16px 0 0',
  padding: '20px 20px 28px',
  animation: `${slideUp} 0.25s ease`,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
});

export const title = style({
  fontSize: vars.fontSize.l,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const closeButton = style({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  color: vars.color.grey400,
  fontSize: vars.fontSize.m,
  cursor: 'pointer',
  padding: 0,
});

export const footer = style({
  marginTop: 16,
});
