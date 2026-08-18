import { style } from '@vanilla-extract/css';

import { fluid, fluidHeight, fluidText } from '@/ui/utils';

import { vars } from '@/ui/theme.css';

export const container = style({
  background: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px 24px',
});

export const title = style({
  fontSize: fluidText(20, 24),
  fontWeight: vars.fontWeight.bold,
  textAlign: 'center',
});

export const desc = style({
  fontSize: fluidText(14, 16),
  fontWeight: vars.fontWeight.regular,
  textAlign: 'center',
});

export const box = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  cursor: 'pointer',

  marginTop: 12,
});

export const option = style({
  width: fluid(342),
  height: fluidHeight(130, 236),
  overflow: 'hidden',
  background: vars.color.white,
  borderRadius: 16,
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,

  selectors: {
    '&:hover': {
      border: `2px solid ${vars.color.blue500}`,
    },
  },
});

export const star = style({
  width: fluidHeight(40, 80),
  height: fluidHeight(40, 80),
  background: vars.color.blue50,
  fontSize: fluidText(20, 40),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const optionTitle = style({
  fontSize: fluidText(16, 18),
  fontWeight: vars.fontWeight.bold,
});

export const optionDesc = style({
  fontSize: fluidText(13, 16),
  fontWeight: vars.fontWeight.regular,
  color: vars.color.grey500,
  textAlign: 'center',
  lineHeight: 1.5,
});

export const hand = style({
  width: fluidHeight(40, 80),
  height: fluidHeight(40, 80),
  background: vars.color.blue100,
  fontSize: fluidText(20, 40),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});
