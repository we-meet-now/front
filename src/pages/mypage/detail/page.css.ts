import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  padding: '0 0 24px',
  display: 'flex',
  flexDirection: 'column',
});

export const section = style({
  padding: '20px 20px 0',
  borderBottom: `1px solid ${vars.color.grey100}`,
  paddingBottom: 20,
});

export const sectionTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  marginBottom: 16,
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'center',
  paddingTop: 10,
  paddingBottom: 10,
  gap: 12,
});

export const infoLabel = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  width: 60,
  flexShrink: 0,
});

export const infoValue = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey900,
  flex: 1,
});

export const editButton = style({
  padding: '4px 10px',
  borderRadius: 6,
  border: `1px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.xs,
  color: vars.color.grey700,
  cursor: 'pointer',
  flexShrink: 0,

  selectors: {
    '&:active': {
      backgroundColor: vars.color.grey100,
    },
  },
});

export const passwordSection = style({
  padding: '20px 20px 24px',
  borderBottom: `1px solid ${vars.color.grey100}`,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const inputLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const input = style({
  padding: '12px 14px',
  borderRadius: 8,
  border: 'none',
  backgroundColor: vars.color.grey100,
  fontSize: vars.fontSize.s,
  color: vars.color.grey900,

  selectors: {
    '&::placeholder': {
      color: vars.color.grey400,
    },
    '&:focus': {
      outline: `1.5px solid ${vars.color.blue300}`,
    },
  },
});

export const changePasswordButton = style({
  marginTop: 4,
  width: '100%',
  padding: '14px 0',
  borderRadius: 10,
  border: 'none',
  backgroundColor: vars.color.grey200,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey700,
  cursor: 'pointer',

  selectors: {
    '&:active': {
      backgroundColor: vars.color.grey300,
    },
  },
});

export const withdrawRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '18px 20px',
  cursor: 'pointer',

  selectors: {
    '&:active': {
      backgroundColor: vars.color.grey100,
    },
  },
});

export const withdrawLabel = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey800,
});

export const withdrawArrow = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey400,
});

export const errorText = style({
  fontSize: vars.fontSize.xs,
  color: 'red',
  marginTop: -4,
});

export const modalOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
});

export const modalBox = style({
  backgroundColor: vars.color.white,
  borderRadius: 16,
  padding: '32px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
  width: 280,
});

export const modalMessage = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  textAlign: 'center',
});
