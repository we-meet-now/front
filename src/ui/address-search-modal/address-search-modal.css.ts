import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const searchRow = style({
  display: 'flex',
  gap: 8,
});

export const inputWrapper = style({
  position: 'relative',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
});

export const input = style({
  width: '100%',
  height: 44,
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 8,
  padding: '0 34px 0 12px',
  fontSize: vars.fontSize.s,
  color: vars.color.grey900,
  backgroundColor: vars.color.white,
  outline: 'none',
  selectors: {
    '&:focus': { borderColor: vars.color.blue500 },
    '&::placeholder': { color: vars.color.grey400 },
  },
});

export const clearButton = style({
  position: 'absolute',
  right: 8,
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: vars.color.grey200,
  color: vars.color.grey600,
  fontSize: 11,
  cursor: 'pointer',
  padding: 0,
});

export const searchButton = style({
  height: 44,
  padding: '0 16px',
  borderRadius: 8,
  border: 'none',
  backgroundColor: vars.color.grey900,
  color: vars.color.white,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  flexShrink: 0,
  selectors: {
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  },
});

export const locationButton = style({
  width: '100%',
  height: 44,
  marginTop: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  borderRadius: 8,
  border: 'none',
  backgroundColor: vars.color.blue50,
  color: vars.color.blue600,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  selectors: {
    '&:disabled': { opacity: 0.5, cursor: 'progress' },
  },
});

export const resultList = style({
  marginTop: 12,
  maxHeight: 240,
  overflowY: 'auto',
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

export const resultAddress = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const emptyText = style({
  padding: '32px 0',
  textAlign: 'center',
  fontSize: vars.fontSize.s,
  color: vars.color.grey400,
});

export const submitButton = style({
  width: '100%',
  height: 48,
  borderRadius: 8,
  border: 'none',
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  selectors: {
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  },
});
