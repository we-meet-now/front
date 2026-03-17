import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/* ── 전체 ── */
export const container = style({
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  overflowY: 'auto',
  height: '100%',
});

/* ── 섹션 ── */
export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const sectionTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

/* ── 멤버 리스트 ── */
export const memberList = style({
  display: 'flex',
  gap: 14,
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const memberItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  minWidth: 48,
});

export const memberAvatar = style({
  width: 44,
  height: 44,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.white,
  fontSize: '16px',
  fontWeight: vars.fontWeight.bold,
});

export const memberName = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey700,
  fontWeight: vars.fontWeight.medium,
  textAlign: 'center',
});

/* ── 진행 상황 스텝 ── */
export const steps = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  padding: '12px 0',
});

export const step = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  minWidth: 64,
});

export const stepCircle = style({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  backgroundColor: vars.color.grey200,
  color: vars.color.grey500,
});

export const stepCircleActive = style({
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
});

export const stepLabel = style({
  fontSize: '11px',
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
});

export const stepLabelActive = style({
  color: vars.color.blue500,
  fontWeight: vars.fontWeight.bold,
});

export const stepLine = style({
  width: 40,
  height: 2,
  backgroundColor: vars.color.grey200,
  marginBottom: 18,
});

export const stepLineActive = style({
  backgroundColor: vars.color.blue500,
});

export const statusMessage = style({
  textAlign: 'center',
  padding: '10px 16px',
  borderRadius: 12,
  backgroundColor: vars.color.grey100,
  fontSize: vars.fontSize.s,
  color: vars.color.grey600,
  fontWeight: vars.fontWeight.medium,
});

/* ── 공평한 장소 ── */
export const fairPlaceBox = style({
  padding: '16px',
  borderRadius: 14,
  backgroundColor: vars.color.grey100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});

export const fairPlaceResult = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const fairPlaceDesc = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  textAlign: 'center',
});

/* ── 장소 추천 입력 ── */
export const recommendInput = style({
  display: 'flex',
  gap: 8,
});

export const input = style({
  flex: 1,
  padding: '10px 14px',
  borderRadius: 10,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.s,
  outline: 'none',

  selectors: {
    '&:focus': {
      borderColor: vars.color.blue400,
      boxShadow: '0 0 0 3px rgba(59,130,246,0.1)',
    },
    '&::placeholder': {
      color: vars.color.grey400,
    },
  },
});

/* ── 버튼 ── */
export const primaryButton = style({
  padding: '12px 20px',
  borderRadius: 12,
  border: 'none',
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  transition: 'all 0.15s ease',
  width: '100%',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blue600,
    },
    '&:disabled': {
      backgroundColor: vars.color.grey300,
      cursor: 'not-allowed',
    },
  },
});

export const smallButton = style({
  padding: '8px 14px',
  borderRadius: 8,
  border: `1px solid ${vars.color.blue500}`,
  backgroundColor: vars.color.white,
  color: vars.color.blue500,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  cursor: 'pointer',
  flexShrink: 0,
  transition: 'all 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blue50,
    },
  },
});

/* ── 장소 카드 ── */
export const placeCardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const placeCard = style({
  display: 'flex',
  gap: 12,
  padding: '14px',
  borderRadius: 14,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
});

export const placeInfo = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
});

export const placeName = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const placeDesc = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  lineHeight: 1.4,
});

export const placeAddress = style({
  fontSize: '11px',
  color: vars.color.grey400,
});

export const placeActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  flexShrink: 0,
  justifyContent: 'center',
});

/* ── 로딩 ── */
export const loadingBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '24px 16px',
  borderRadius: 14,
  backgroundColor: vars.color.grey100,
  fontSize: vars.fontSize.s,
  color: vars.color.grey600,
});

/* ── 추천 더받기 버튼 ── */
export const moreButton = style({
  padding: '12px 20px',
  borderRadius: 12,
  border: 'none',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: vars.color.white,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  width: '100%',
  transition: 'all 0.15s ease',

  selectors: {
    '&:hover': {
      opacity: '0.9',
    },
  },
});
