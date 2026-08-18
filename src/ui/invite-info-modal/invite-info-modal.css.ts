import { keyframes, style } from '@vanilla-extract/css';

import { fluidText } from '@/ui/utils';

import { vars } from '@/ui/theme.css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const popIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  zIndex: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 24px',
  animation: `${fadeIn} 0.2s ease`,
});

export const card = style({
  position: 'relative',
  width: '100%',
  maxWidth: 340,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.color.white,
  borderRadius: 24,
  padding: '28px 20px 24px',
  animation: `${popIn} 0.2s ease`,
});

export const closeButton = style({
  position: 'absolute',
  top: 14,
  right: 14,
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  color: vars.color.grey400,
  fontSize: 18,
  cursor: 'pointer',
  selectors: {
    '&:hover': { color: vars.color.grey700 },
  },
});

/* ── 초대장 이미지(목업, Partiful 스타일) ── */
export const inviteCard = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '280 / 168',
  borderRadius: 18,
  overflow: 'hidden',
  backgroundColor: vars.color.grey100,
});

export const inviteIllust = style({
  width: '100%',
  height: '100%',
});

export const inviteCustomImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

export const changeImageButton = style({
  position: 'absolute',
  right: 10,
  bottom: 10,
  border: 'none',
  borderRadius: 20,
  padding: '6px 12px',
  backgroundColor: 'rgba(0,0,0,0.45)',
  color: vars.color.white,
  fontSize: fluidText(11, 12),
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'opacity 120ms ease',
  selectors: {
    '&:hover': { opacity: 0.85 },
  },
});

export const inviteRoomTitle = style({
  marginTop: 14,
  fontSize: fluidText(16, 18),
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  textAlign: 'center',
});

export const inviteCaption = style({
  marginTop: 2,
  fontSize: fluidText(11, 12),
  color: vars.color.grey500,
  textAlign: 'center',
});

export const message = style({
  marginTop: 18,
  fontSize: fluidText(14, 16),
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  textAlign: 'center',
});

export const subMessage = style({
  marginTop: 4,
  fontSize: fluidText(12, 13),
  color: vars.color.grey500,
  textAlign: 'center',
});

/* ── 초대코드 ── */
export const codeRow = style({
  width: '100%',
  boxSizing: 'border-box',
  marginTop: 18,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 16px',
  borderRadius: 12,
  backgroundColor: vars.color.grey100,
});

export const code = style({
  flex: 1,
  fontSize: fluidText(15, 17),
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  letterSpacing: '1px',
});

export const copyButton = style({
  flexShrink: 0,
  border: 'none',
  borderRadius: 8,
  padding: '8px 12px',
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: fluidText(12, 13),
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'opacity 120ms ease',
  selectors: {
    '&:hover': { opacity: 0.9 },
    '&:active': { opacity: 0.85 },
  },
});
