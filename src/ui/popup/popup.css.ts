import { createVar, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const widthVar = createVar();
export const heightVar = createVar();

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  animation: `${fadeIn} 0.2s ease`,
});

export const popup = style({
  position: 'relative',
  width: widthVar,
  height: heightVar,
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: vars.color.white,
  borderRadius: 20,
  padding: '32px 20px 20px',
  animation: `${scaleIn} 0.2s ease`,
});

export const closeButton = style({
  position: 'absolute',
  top: 16,
  right: 16,
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

export const title = style({
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.xl,
  textAlign: 'center',
});

export const subtitle = style({
  marginTop: 6,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.regular,
  fontSize: vars.fontSize.s,
  textAlign: 'center',
});

export const content = style({
  marginTop: 24,
});

export const footer = style({
  marginTop: 16,
  display: 'flex',
  justifyContent: 'center',
  fontSize: vars.fontSize.xs,
  color: vars.color.grey400,
  textAlign: 'center',
});
