import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const preview = style({
  position: 'relative',
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 12,
  padding: '16px 44px 16px 16px',
  backgroundColor: vars.color.grey100,
});

export const previewText = style({
  fontSize: vars.fontSize.s,
  lineHeight: 1.6,
  color: vars.color.grey700,
  whiteSpace: 'pre-line',
});

export const previewLink = style({
  marginTop: 8,
  fontSize: vars.fontSize.xs,
  color: vars.color.blue500,
  wordBreak: 'break-all',
});

export const copyButton = style({
  position: 'absolute',
  top: 12,
  right: 12,
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: 14,
  cursor: 'pointer',
  padding: 0,
  selectors: {
    '&:active': { backgroundColor: vars.color.grey100 },
  },
});

export const targets = style({
  display: 'flex',
  gap: 10,
  marginTop: 16,
});

export const target = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  padding: '14px 8px',
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 12,
  backgroundColor: vars.color.white,
  cursor: 'pointer',
  fontSize: 22,
  transition: 'background-color 120ms ease',
  selectors: {
    '&:active': { backgroundColor: vars.color.grey100 },
  },
});

export const targetLabel = style({
  fontSize: vars.fontSize.xxs,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
});
