import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

const resetButton = style({
  border: 'none',
  background: 'none',
  padding: 0,
  cursor: 'pointer',
  textAlign: 'left',
});

export const checkbox = style({
  flexShrink: 0,
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `1.5px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.white,
  color: vars.color.white,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  transition: 'background-color 0.15s, border-color 0.15s',
});

export const checkboxLarge = style({
  width: 24,
  height: 24,
  fontSize: vars.fontSize.s,
});

export const checkboxChecked = style({
  borderColor: vars.color.green500,
  backgroundColor: vars.color.green500,
});

export const allRow = style([
  resetButton,
  {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 4px',
    borderRadius: 12,
    backgroundColor: vars.color.grey100,
  },
]);

export const allLabel = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const list = style({
  listStyle: 'none',
  margin: '2px 0 0',
  padding: 0,
});

export const item = style({
  borderBottom: `1px solid ${vars.color.grey200}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const itemRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '14px 12px',
});

export const itemToggle = style([
  resetButton,
  {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
]);

export const itemLabel = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey800,
  lineHeight: 1.4,
});

export const required = style({
  color: vars.color.green600,
  fontWeight: vars.fontWeight.medium,
});

export const optional = style({
  color: vars.color.grey500,
});

export const viewButton = style([
  resetButton,
  {
    flexShrink: 0,
    minWidth: 52,
    height: 28,
    padding: '0 10px',
    textAlign: 'center',
    borderRadius: 6,
    border: `1px solid ${vars.color.grey300}`,
    backgroundColor: vars.color.white,
    color: vars.color.grey600,
    fontSize: vars.fontSize.xs,
    selectors: {
      '&:active': {
        backgroundColor: vars.color.grey100,
      },
    },
  },
]);

export const detail = style({
  maxHeight: '50vh',
  overflowY: 'auto',
  padding: 12,
  borderRadius: 8,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
});

export const fullWidthButton = style({
  width: '100%',
  minWidth: 0,
});
