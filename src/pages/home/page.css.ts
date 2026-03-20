import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/* ── 전체 컨테이너 ── */
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
});

/* ── 검색바 ── */
export const searchBar = style({
  position: 'absolute',
  top: 12,
  left: 16,
  right: 16,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 16px',
  borderRadius: 12,
  backgroundColor: vars.color.white,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  fontSize: vars.fontSize.s,
  color: vars.color.grey400,
});

/* ── 알람 버튼 (플로팅) ── */
export const alarmButton = style({
  position: 'absolute',
  top: 70,
  right: 16,
  zIndex: 10,
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: vars.color.white,
  border: `1.5px solid ${vars.color.grey300}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
});

export const bellIcon = style({
  width: 24,
  height: 24,
  color: vars.color.grey700,
});

export const alarmBadge = style({
  position: 'absolute',
  top: -4,
  right: -4,
  minWidth: 20,
  height: 20,
  padding: '0 5px',
  borderRadius: 10,
  backgroundColor: '#ef4444',
  color: vars.color.white,
  fontSize: '11px',
  fontWeight: vars.fontWeight.bold,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
});

/* ── 지도 영역 ── */
export const mapArea = style({
  flex: 1,
  position: 'relative',
});

/* ── 바텀시트 ── */
export const bottomSheet = style({
  backgroundColor: vars.color.white,
  borderRadius: '20px 20px 0 0',
  boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
  padding: '0 20px 16px',
});

export const dragHandle = style({
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: vars.color.grey300,
  margin: '10px auto 16px',
});

/* ── 출발 위치 ── */
export const departureRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
});

export const departureLabel = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const changeButton = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.blue500,
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
});

/* ── 멤버 목록 ── */
export const memberList = style({
  display: 'flex',
  gap: 16,
  marginBottom: 20,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': { display: 'none' },
});

export const memberItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  minWidth: 56,
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
});

export const memberEta = style({
  fontSize: '11px',
  color: vars.color.grey400,
});

export const statusBadge = style({
  padding: '2px 8px',
  borderRadius: 10,
  fontSize: '11px',
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  marginTop: 2,
});

/* ── 만날 장소 섹션 ── */
export const placeSection = style({
  borderTop: `1px solid ${vars.color.grey100}`,
  paddingTop: 14,
});

export const placeSectionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
});

export const placeSectionTitle = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
});

export const moreButton = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.blue500,
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
});

/* 장소 카드 */
export const placeCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 14px',
  borderRadius: 14,
  backgroundColor: vars.color.grey100,
});

export const placeIcon = style({
  width: 40,
  height: 40,
  borderRadius: 10,
  backgroundColor: vars.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  flexShrink: 0,
});

export const placeInfo = style({
  flex: 1,
  minWidth: 0,
});

export const placeName = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  marginBottom: 2,
});

export const placeAddress = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const placeTime = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.blue500,
  flexShrink: 0,
});

/* 장소 미정 안내 */
export const placeEmpty = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '16px 14px',
  borderRadius: 14,
  backgroundColor: vars.color.grey100,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey200,
    },
  },
});

export const placeEmptyText = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
});
