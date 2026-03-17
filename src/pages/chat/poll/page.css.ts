import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

/* ── 투표 카드 ── */
export const pollCard = style({
  backgroundColor: vars.color.white,
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
});

export const pollHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 4,
});

export const pollIcon = style({
  fontSize: '20px',
});

export const pollTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const pollMeta = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  marginBottom: 16,
});

/* ── 장소 항목 ── */
export const placeList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const placeItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 14px',
  borderRadius: 10,
  border: `1px solid ${vars.color.grey200}`,
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});

export const placeItemSelected = style({
  borderColor: vars.color.blue500,
  backgroundColor: '#eff6ff',
});

export const radio = style({
  width: 20,
  height: 20,
  borderRadius: '50%',
  border: `2px solid ${vars.color.grey300}`,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const radioSelected = style({
  borderColor: vars.color.blue500,

  '::after': {
    content: '""',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: vars.color.blue500,
  },
});

export const placeInfo = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const placeName = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const placeAddress = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const voteCount = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
  flexShrink: 0,
});

export const emptyMessage = style({
  padding: '40px 0',
  textAlign: 'center',
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  lineHeight: '1.5',
});

/* ── 리액션 ── */
export const reactionBar = style({
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  marginTop: 16,
  paddingTop: 16,
  borderTop: `1px solid ${vars.color.grey200}`,
});

export const reactionItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  cursor: 'pointer',
});

export const reactionEmoji = style({
  width: 44,
  height: 44,
  borderRadius: '50%',
  backgroundColor: vars.color.grey100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  transition: 'all 0.15s ease',
});

export const reactionEmojiSelected = style({
  backgroundColor: '#fef3c7',
});

export const reactionLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey600,
});

/* ── 버튼 영역 ── */
export const buttonArea = style({
  marginTop: 8,
});

/* ── AI 추천 배너 ── */
export const aiBanner = style({
  display: 'flex',
  gap: 10,
  padding: '14px 16px',
  borderRadius: 12,
  backgroundColor: '#eef2ff',
  alignItems: 'flex-start',
});

export const aiBannerIcon = style({
  width: 28,
  height: 28,
  borderRadius: '50%',
  backgroundColor: '#818cf8',
  color: vars.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  flexShrink: 0,
});

export const aiBannerContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const aiBannerTitle = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const aiBannerDesc = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey600,
  lineHeight: '1.4',
});
