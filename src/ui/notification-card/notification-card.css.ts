import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '14px 16px',
  borderRadius: 12,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
});

export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 52,
  padding: '3px 0',
  borderRadius: 6,
  fontSize: '11px',
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  flexShrink: 0,
  textAlign: 'center',
});

export const roomName = style({
  flex: 1,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const date = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey400,
  flexShrink: 0,
});

export const message = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey600,
  lineHeight: 1.5,
  paddingLeft: 2,
});

export const moreButton = style({
  marginLeft: 'auto',
  padding: '0 2px',
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: '16px',
  color: vars.color.grey400,
  cursor: 'pointer',
  flexShrink: 0,
  lineHeight: 1,
});
