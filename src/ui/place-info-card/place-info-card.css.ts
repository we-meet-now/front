import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const card = style({
  position: 'absolute',
  left: 16,
  right: 16,
  bottom: 16,
  zIndex: 10,
  padding: 16,
  borderRadius: 16,
  backgroundColor: vars.color.white,
  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
});

export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 8,
});

export const titleGroup = style({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: 6,
  minWidth: 0,
});

export const name = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const category = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const closeButton = style({
  width: 24,
  height: 24,
  flexShrink: 0,
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

export const address = style({
  marginTop: 6,
  fontSize: vars.fontSize.s,
  color: vars.color.grey600,
});

export const actions = style({
  display: 'flex',
  gap: 8,
  marginTop: 14,
});

export const actionButton = style({
  flex: 1,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  backgroundColor: vars.color.grey100,
  color: vars.color.grey900,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
