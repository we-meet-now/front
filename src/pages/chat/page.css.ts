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

/* ── 아바타 그룹 ── */
export const avatarGroup = style({
  position: 'relative',
  width: '52px',
  height: '52px',
  flexShrink: 0,
});

export const avatarCircle = style({
  position: 'absolute',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.white,
  fontSize: '11px',
  fontWeight: vars.fontWeight.bold,
  border: `2px solid ${vars.color.white}`,
  boxSizing: 'border-box',
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
});

/* ── 시간 ── */
export const chatTime = style({
  fontSize: '11px',
  color: vars.color.grey400,
  flexShrink: 0,
  alignSelf: 'flex-start',
  marginTop: 2,
});
