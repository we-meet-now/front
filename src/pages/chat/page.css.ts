import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/* ── 탭 ── */
export const tabBar = style({
  display: 'flex',
  borderBottom: `1px solid ${vars.color.grey100}`,
});

export const tab = style({
  flex: 1,
  padding: '12px 0',
  textAlign: 'center',
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey400,
  cursor: 'pointer',
  borderBottom: '2px solid transparent',
  transition: 'all 0.2s ease',
});

export const activeTab = style({
  color: vars.color.grey900,
  fontWeight: vars.fontWeight.bold,
  borderBottomColor: vars.color.grey900,
});

/* ── 채팅방 목록 ── */
export const chatList = style({
  display: 'flex',
  flexDirection: 'column',
  // 마지막 방이 플로팅 만들기 버튼에 가려지지 않도록 여유를 둔다
  paddingBottom: 88,
});

export const chatItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});

/* ── 방 아바타 ── */
export const roomAvatar = style({
  width: '44px',
  height: '44px',
  flexShrink: 0,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.white,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
});

/* ── 채팅방 정보 ── */
export const chatInfo = style({
  flex: 1,
  minWidth: 0,
});

export const chatName = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  marginBottom: 4,
});

export const chatPreview = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/* ── 빈 상태 ── */
export const emptyState = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  flex: 1,
  fontSize: vars.fontSize.m,
  color: vars.color.grey400,
  textAlign: 'center',
  lineHeight: 1.6,
  padding: '80px 24px',
});

/* ── 방 메뉴(⋮) 버튼 ── */
export const moreButton = style({
  width: 32,
  height: 32,
  flexShrink: 0,
  marginRight: -8,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.grey500,
  fontSize: '18px',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey200,
    },
  },
});

/* ── 읽지 않은 메시지 수 ── */
export const unreadBadge = style({
  minWidth: '20px',
  height: '20px',
  flexShrink: 0,
  padding: '0 6px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: '11px',
  fontWeight: vars.fontWeight.bold,
});

/* ── 모임 만들기 플로팅 버튼 ── */
// MobileLayout(최대 440px, 가운데 정렬) 안쪽 오른쪽 아래, GNB(70px) 바로 위에 붙인다
const GNB_HEIGHT = 70;
const MOBILE_MAX_WIDTH = 440;

export const createFab = style({
  position: 'fixed',
  bottom: GNB_HEIGHT + 16,
  right: `max(16px, calc((100vw - ${MOBILE_MAX_WIDTH}px) / 2 + 16px))`,
  zIndex: 10,
  height: 52,
  padding: '0 20px 0 14px',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  border: 'none',
  borderRadius: 26,
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  boxShadow: '0 6px 16px rgba(59, 130, 246, 0.35)',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blue600,
    },
    '&:active': {
      transform: 'scale(0.96)',
    },
  },
});

export const createFabIcon = style({
  width: 28,
  height: 28,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  fontSize: 20,
  lineHeight: 1,
});
