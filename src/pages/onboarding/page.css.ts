import { style } from '@vanilla-extract/css';

import { fluidText } from '@/ui/utils';

import { vars } from '@/ui/theme.css';

export const onboarding = style({
  background: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 20px 20px',
});

export const brandHeader = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  height: 44,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // 아래 buttonContainer의 'l' 사이즈 버튼 좌측 시작 위치와 맞춘 값
  paddingLeft: 'clamp(40px, 12.8vw, 56px)',
  paddingRight: 20,
  backgroundColor: vars.color.white,
  borderBottom: `1px solid ${vars.color.grey200}`,
});

export const brandHeaderText = style({
  color: vars.color.grey800,
  fontWeight: vars.fontWeight.medium,
  fontSize: fluidText(14, 16),
  letterSpacing: '-0.2px',
});

export const loginLink = style({
  border: 'none',
  background: 'none',
  padding: 0,
  color: vars.color.blue500,
  fontWeight: vars.fontWeight.medium,
  fontSize: fluidText(13, 14),
  cursor: 'pointer',
});

export const topIntro = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const logo = style({
  display: 'flex',
  justifyContent: 'center',
  '@media': {
    '(max-height: 700px)': {
      display: 'none',
    },
  },
});

export const logoIcon = style({
  width: 'clamp(48px, 15vw, 66px)',
  height: 'clamp(48px, 15vw, 66px)',
});

export const title = style({
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
  fontSize: fluidText(16, 18),
  textAlign: 'center',
});

export const subtitle = style({
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.regular,
  fontSize: fluidText(12, 14),
  textAlign: 'center',
});

export const cardBox = style({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,
  marginTop: 24,
  gap: 12,
  overflowX: 'auto',
  paddingBottom: 8,
  paddingLeft: 'calc(50% - 109px)',
  paddingRight: 'calc(50% - 109px)',
  scrollSnapType: 'x mandatory',
  cursor: 'grab',
  userSelect: 'none',
  WebkitOverflowScrolling: 'touch',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
    '&:active': { cursor: 'grabbing' },
  },
});

export const card = style({
  background: vars.color.white,
  width: 218,
  flexShrink: 0,
  padding: 16,
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  scrollSnapAlign: 'center',
  transformOrigin: 'center',
  transition: 'transform 150ms ease-out, opacity 150ms ease-out',
  willChange: 'transform, opacity',
});

export const dotRow = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 6,
  marginTop: 12,
});

export const dot = style({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: vars.color.grey200,
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'background-color 150ms ease-out, transform 150ms ease-out',
});

export const dotActive = style({
  backgroundColor: vars.color.blue500,
  transform: 'scale(1.4)',
});

export const cardImage = style({
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: 8,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const cardTitle = style({
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
  fontSize: fluidText(13, 15),
  letterSpacing: '-0.5px',
  textAlign: 'center',
});

export const cardDesc = style({
  color: vars.color.grey500,
  fontSize: vars.fontSize.s,
});

export const buttonContainer = style({
  marginTop: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});

export const guestButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: vars.fontSize.s,
  color: vars.color.grey600,
  fontWeight: vars.fontWeight.medium,
  padding: '4px 0',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
});

export const guestCaption = style({
  fontSize: vars.fontSize.xxs,
  color: vars.color.grey400,
  marginTop: -6,
});
