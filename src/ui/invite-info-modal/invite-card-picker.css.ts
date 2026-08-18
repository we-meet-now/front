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
  zIndex: 160,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  animation: `${fadeIn} 0.2s ease`,
});

export const sheet = style({
  width: '100%',
  maxWidth: 440,
  maxHeight: '85vh',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.color.white,
  borderRadius: '16px 16px 0 0',
  padding: '10px 16px 24px',
  animation: `${slideUp} 0.25s ease`,
  overflowY: 'auto',
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
  marginBottom: 12,
});

export const uploadRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: '100%',
  padding: '12px 4px',
  border: 'none',
  borderBottom: `1px solid ${vars.color.grey100}`,
  background: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  marginBottom: 14,
});

export const uploadIcon = style({
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

export const uploadLabel = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey900,
});

export const hiddenFileInput = style({
  display: 'none',
});

export const sectionLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
  marginBottom: 10,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 10,
});

export const tile = style({
  position: 'relative',
  aspectRatio: '280 / 168',
  borderRadius: 10,
  overflow: 'hidden',
  border: '2px solid transparent',
  cursor: 'pointer',
  padding: 0,
  transition: 'transform 0.12s ease',
  selectors: {
    '&:active': { transform: 'scale(0.96)' },
  },
});

export const tileSelected = style({
  borderColor: vars.color.blue500,
});

export const tileCheck = style({
  position: 'absolute',
  top: 4,
  right: 4,
  width: 18,
  height: 18,
  borderRadius: '50%',
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: 11,
  fontWeight: vars.fontWeight.bold,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
