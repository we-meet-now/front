import { style } from '@vanilla-extract/css';

import { fluidHeight, fluidText } from '@/ui/utils';

import { vars } from '@/ui/theme.css';

export const container = style({
  background: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: fluidHeight(14, 28),
  paddingBottom: fluidHeight(12, 24),
  paddingLeft: 24,
  paddingRight: 24,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: fluidHeight(8, 16),
  textAlign: 'center',
  marginTop: fluidHeight(4, 12),
});

export const party = style({
  width: fluidHeight(44, 120),
  height: fluidHeight(44, 120),
  background: vars.color.blue50,
  fontSize: fluidText(20, 60),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const title = style({
  fontSize: fluidText(18, 24),
  fontWeight: vars.fontWeight.bold,
  textAlign: 'center',
});

export const desc = style({
  fontSize: fluidText(12, 16),
  fontWeight: vars.fontWeight.regular,
  textAlign: 'center',
  color: vars.color.grey600,
});

export const content2 = style({
  display: 'flex',
  flexDirection: 'column',
  gap: fluidHeight(10, 20),
  padding: fluidHeight(12, 24),
  background: vars.color.white,
  borderRadius: 16,
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
  marginTop: fluidHeight(12, 28),
});

export const title2 = style({
  fontSize: fluidText(16, 18),
  fontWeight: vars.fontWeight.bold,
});

export const step = style({
  display: 'flex',
});

export const stepNumber = style({
  width: fluidHeight(24, 32),
  height: fluidHeight(24, 32),
  background: vars.color.blue200,
  fontSize: fluidText(14, 16),
  fontWeight: vars.fontWeight.bold,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const stepContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginLeft: 12,
});

export const stepTitle = style({
  fontSize: fluidText(14, 16),
  fontWeight: vars.fontWeight.bold,
});

export const stepDesc = style({
  fontSize: fluidText(12, 14),
  fontWeight: vars.fontWeight.regular,
  color: vars.color.grey600,
});

export const content3 = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  paddingTop: fluidHeight(8, 14),
  paddingBottom: fluidHeight(8, 14),
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 12,
  background: vars.color.blue50,
  marginTop: fluidHeight(12, 28),
});

export const title3 = style({
  fontSize: fluidText(14, 16),
  fontWeight: vars.fontWeight.bold,
  color: vars.color.blue600,
});
export const desc3 = style({
  fontSize: fluidText(12, 14),
  fontWeight: vars.fontWeight.regular,
  color: vars.color.blue600,
});
