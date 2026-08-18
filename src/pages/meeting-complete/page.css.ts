import { keyframes, style } from '@vanilla-extract/css';

import { fluid, fluidHeight, fluidText } from '@/ui/utils';

import { vars } from '@/ui/theme.css';

const float = keyframes({
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-6px)' },
  '100%': { transform: 'translateY(0)' },
});

export const container = style({
  minHeight: '100vh',
  boxSizing: 'border-box',
  padding: '40px 20px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: vars.color.grey100,
});

export const content = style({
  width: '100%',
  maxWidth: 360,
  boxSizing: 'border-box',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  textAlign: 'center',
});

export const iconWrapper = style({
  width: fluid(88),
  height: fluid(88),
  borderRadius: '50%',
  flexShrink: 0,

  backgroundColor: vars.color.blue50,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginBottom: fluidHeight(16, 24),
  animation: `${float} 2s ease-in-out infinite`,
});

export const icon = style({
  fontSize: fluidText(32, 44),
});

export const title = style({
  fontSize: fluidText(18, 22),
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  marginBottom: 10,
});

export const description = style({
  fontSize: fluidText(13, 16),
  color: vars.color.grey600,
  lineHeight: 1.5,
  marginBottom: fluidHeight(24, 40),
});

export const buttonGroup = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});
