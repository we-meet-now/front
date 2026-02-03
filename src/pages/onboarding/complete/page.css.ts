import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

const float = keyframes({
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-6px)' },
  '100%': { transform: 'translateY(0)' },
});

export const container = style({
  minHeight: '100vh',
  padding: '40px 16px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  background: `linear-gradient(180deg, ${vars.color.blue500}, ${vars.color.blue700})`,
  position: 'relative',
  overflow: 'hidden',
});

export const confetti = style({
  position: 'absolute',
  inset: 0,

  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
  backgroundSize: '80px 80px',
  opacity: 0.2,
});

export const content = style({
  width: '100%',
  maxWidth: 360,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  textAlign: 'center',
  color: vars.color.white,
  zIndex: 1,
});

export const checkWrapper = style({
  width: 96,
  height: 96,
  borderRadius: '50%',

  backgroundColor: 'rgba(255,255,255,0.2)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginBottom: 24,
  animation: `${float} 2s ease-in-out infinite`,
});

export const checkIcon = style({
  fontSize: 48,
  fontWeight: vars.fontWeight.bold,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  marginBottom: 12,
});

export const description = style({
  fontSize: vars.fontSize.m,
  opacity: 0.9,
  lineHeight: 1.5,
  marginBottom: 62,
});

export const recommendCard = style({
  width: '100%',
  padding: '16px 12px',
  borderRadius: 12,

  backgroundColor: 'rgba(255,255,255,0.2)',

  marginBottom: 32,
});

export const recommendLabel = style({
  fontSize: vars.fontSize.s,
  opacity: 0.8,
});

export const recommendTitle = style({
  display: 'block',
  marginTop: 4,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
});
