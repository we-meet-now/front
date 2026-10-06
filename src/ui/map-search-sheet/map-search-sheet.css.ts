import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

const slideUp = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const sheet = style({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 20,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '50%',
  padding: '0 16px 16px',
  borderRadius: '16px 16px 0 0',
  backgroundColor: vars.color.white,
  boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
  animation: `${slideUp} 0.25s ease`,
});

export const handle = style({
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: vars.color.grey300,
  margin: '10px auto 12px',
  flexShrink: 0,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
  flexShrink: 0,
});

export const title = style({
  fontSize: vars.fontSize.m,
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
  fontSize: vars.fontSize.s,
  cursor: 'pointer',
  padding: 0,
});

export const resultHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 8,
  padding: '0 10px',
  flexShrink: 0,
});

export const scopeText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const showAllButton = style({
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.blue500,
  cursor: 'pointer',
});

export const resultList = style({
  marginTop: 4,
  overflowY: 'auto',
  minHeight: 0,
});

export const resultItem = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 3,
  padding: '12px 10px',
  border: 'none',
  borderRadius: 8,
  backgroundColor: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.grey100 },
  },
});

export const resultName = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey900,
});

export const resultCategory = style({
  marginLeft: 6,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.regular,
  color: vars.color.grey500,
});

export const resultAddress = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const emptyText = style({
  padding: '28px 0',
  textAlign: 'center',
  fontSize: vars.fontSize.s,
  color: vars.color.grey400,
});
