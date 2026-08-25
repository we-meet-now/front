import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

const slideDown = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, -12px)' },
  to: { opacity: 1, transform: 'translate(-50%, 0)' },
});

export const toast = style({
  position: 'fixed',
  top: 16,
  left: '50%',
  zIndex: 200,
  width: 'calc(100% - 40px)',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  padding: '12px 16px',
  borderRadius: 10,
  backgroundColor: vars.color.grey900,
  boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
  cursor: 'pointer',
  animation: `${slideDown} 0.2s ease`,
});

export const title = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
});

export const description = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey300,
  lineHeight: 1.45,
});
