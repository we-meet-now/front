import { createVar, fallbackVar, globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/** 세로가 짧은 기기(iPhone SE 등)에서 상단 영역을 줄이는 기준 높이 */
const SHORT_SCREEN = 'screen and (max-height: 740px)';

/**
 * 카드 가로 폭. 이미지가 1:1이라 카드 높이도 이 값에 비례하므로
 * 화면 가로(좌우 여백 24px씩)와 세로(카드 외 영역 약 380px) 중 작은 쪽에 맞추고,
 * 최대 327px(기본 디자인), 최소 200px로 제한한다.
 */
const cardWidth = createVar();
const CARD_WIDTH_VH = 'min(327px, calc(100vw - 48px), max(200px, calc(100vh - 380px)))';
const CARD_WIDTH_DVH = 'min(327px, calc(100vw - 48px), max(200px, calc(100dvh - 380px)))';

export const onboarding = style({
  background: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 20px 20px 20px',
  vars: { [cardWidth]: CARD_WIDTH_VH },
  '@supports': {
    '(height: 100dvh)': { vars: { [cardWidth]: CARD_WIDTH_DVH } },
  },
  '@media': {
    [SHORT_SCREEN]: { paddingTop: 20 },
  },
});

export const logo = style({
  display: 'flex',
  justifyContent: 'center',
});

globalStyle(`${logo} svg`, {
  width: 100,
  height: 100,
  '@media': {
    [SHORT_SCREEN]: { width: 64, height: 64 },
  },
});

export const title = style({
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.xxxl,
  textAlign: 'center',
});

export const subtitle = style({
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.regular,
  fontSize: vars.fontSize.m,
  textAlign: 'center',
});

export const cardBox = style({
  display: 'flex',
  flexDirection: 'row',
  // 세로 flex 안에서 화면이 짧으면 캐러셀이 줄어들며 카드가 잘리므로 높이를 유지한다
  flexShrink: 0,
  marginTop: 24,
  gap: 12,
  overflowX: 'auto',
  paddingBottom: 8,
  // 첫/마지막 카드도 가운데 정렬되도록 카드 폭의 절반만큼 여백을 둔다
  paddingLeft: `calc(50% - ${fallbackVar(cardWidth, '327px')} / 2)`,
  paddingRight: `calc(50% - ${fallbackVar(cardWidth, '327px')} / 2)`,
  '@media': {
    [SHORT_SCREEN]: { marginTop: 16 },
  },
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
  width: fallbackVar(cardWidth, '327px'),
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
  fontSize: vars.fontSize.xl,
  letterSpacing: '-0.5px',
  textAlign: 'center',
});

export const cardDesc = style({
  color: vars.color.grey500,
  fontSize: vars.fontSize.s,
});

export const buttonContainer = style({
  marginTop: 24,
  '@media': {
    [SHORT_SCREEN]: { marginTop: 16 },
  },
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

export const joinFooterLink = style({
  marginLeft: 4,
  color: vars.color.blue500,
  fontWeight: vars.fontWeight.medium,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  fontSize: vars.fontSize.xs,
});

export const joinField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const joinInput = style({
  padding: '12px 14px',
  borderRadius: 10,
  border: `1px solid ${vars.color.grey300}`,
  fontSize: vars.fontSize.m,
  color: vars.color.grey900,
  textAlign: 'center',
  letterSpacing: '2px',

  selectors: {
    '&::placeholder': {
      color: vars.color.grey400,
      letterSpacing: 'normal',
    },
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.blue500,
    },
  },
});

export const loginDivider = style({
  width: '100%',
  maxWidth: 327,
  height: 1,
  marginTop: 8,
  background: vars.color.grey200,
});

export const loginRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const loginLink = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.blue500,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
});
