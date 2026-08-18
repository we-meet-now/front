import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

const fadeInUp = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, 8px)' },
  to: { opacity: 1, transform: 'translate(-50%, 0)' },
});

export const toast = style({
  position: 'fixed',
  left: '50%',
  bottom: 90,
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(32,36,49,0.92)',
  color: vars.color.white,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  padding: '11px 18px',
  borderRadius: 20,
  whiteSpace: 'nowrap',
  zIndex: 200,
  animation: `${fadeInUp} 0.2s ease`,
});
