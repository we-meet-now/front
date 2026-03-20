import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/* ── 탭 네비게이션 ── */
export const tabBar = style({
  display: 'flex',
  gap: 6,
  padding: '8px 16px',
  backgroundColor: vars.color.white,
  borderBottom: `1px solid ${vars.color.grey100}`,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': { display: 'none' },
});

export const tab = style({
  position: 'relative',
  padding: '6px 14px',
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey500,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  borderRadius: 20,
  transition: 'all 0.2s ease',
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});

export const activeTab = style({
  color: vars.color.white,
  fontWeight: vars.fontWeight.bold,
  backgroundColor: vars.color.blue500,
  borderColor: vars.color.blue500,

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blue600,
    },
  },
});

export const tabBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 16,
  height: 16,
  padding: '0 5px',
  borderRadius: 8,
  backgroundColor: '#ef4444',
  color: vars.color.white,
  fontSize: '10px',
  fontWeight: vars.fontWeight.bold,
  marginLeft: 5,
  lineHeight: 1,
});

/* ── 채팅 영역 ── */
export const chatArea = style({
  flex: 1,
  overflowY: 'auto',
  padding: '12px 16px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  backgroundColor: '#f0f2f5',
});

/* ── 날짜 구분선 ── */
export const dateSeparator = style({
  alignSelf: 'center',
  padding: '5px 14px',
  borderRadius: 16,
  backgroundColor: 'rgba(0,0,0,0.06)',
  fontSize: vars.fontSize.xs,
  color: vars.color.grey600,
  margin: '8px 0',
  fontWeight: vars.fontWeight.medium,
});

/* ── 시스템 메시지 ── */
export const systemMessage = style({
  alignSelf: 'center',
  padding: '5px 14px',
  borderRadius: 16,
  backgroundColor: 'rgba(59,130,246,0.08)',
  fontSize: vars.fontSize.xs,
  color: vars.color.blue600,
  margin: '4px 0',
});

/* ── 메시지 행 ── */
export const messageRow = style({
  display: 'flex',
  gap: 8,
  maxWidth: '78%',
  alignItems: 'flex-end',
});

export const messageRowMine = style({
  alignSelf: 'flex-end',
  flexDirection: 'row-reverse',
});

/* ── 아바타 ── */
export const avatar = style({
  width: 36,
  height: 36,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.white,
  fontSize: '13px',
  fontWeight: vars.fontWeight.bold,
  flexShrink: 0,
  alignSelf: 'flex-start',
  marginTop: 2,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
});

export const avatarHidden = style({
  visibility: 'hidden' as const,
});

/* ── 메시지 본문 ── */
export const messageBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
});

export const senderName = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey600,
  fontWeight: vars.fontWeight.medium,
  marginLeft: 4,
});

export const bubble = style({
  padding: '9px 13px',
  borderRadius: '18px 18px 18px 4px',
  fontSize: vars.fontSize.s,
  lineHeight: 1.5,
  backgroundColor: vars.color.white,
  color: vars.color.grey900,
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  wordBreak: 'break-word',
});

export const bubbleMine = style({
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  borderRadius: '18px 18px 4px 18px',
  boxShadow: '0 1px 3px rgba(59,130,246,0.25)',
});

/* ── 메시지 시간 + 읽음 ── */
export const messageFooter = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginTop: 2,
});

export const messageFooterMine = style({
  justifyContent: 'flex-end',
});

export const messageTime = style({
  fontSize: '11px',
  color: vars.color.grey400,
});

export const unreadCount = style({
  fontSize: '11px',
  color: vars.color.blue500,
  fontWeight: vars.fontWeight.bold,
});

/* ── 사진 메시지 ── */
export const imageBubble = style({
  borderRadius: 14,
  overflow: 'hidden',
  maxWidth: 200,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
});

export const messageImage = style({
  width: '100%',
  height: 'auto',
  display: 'block',
  backgroundColor: vars.color.grey200,
  minHeight: 120,
  objectFit: 'cover',
});

/* ── 입력창 ── */
export const inputArea = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 12px',
  backgroundColor: vars.color.white,
  borderTop: `1px solid ${vars.color.grey100}`,
});

export const attachButton = style({
  width: 38,
  height: 38,
  borderRadius: '50%',
  backgroundColor: vars.color.grey100,
  color: vars.color.grey600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  cursor: 'pointer',
  border: 'none',
  flexShrink: 0,
  transition: 'all 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey200,
    },
  },
});

export const input = style({
  flex: 1,
  padding: '9px 16px',
  borderRadius: 22,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.grey100,
  fontSize: vars.fontSize.s,
  outline: 'none',
  transition: 'all 0.2s ease',

  selectors: {
    '&:focus': {
      borderColor: vars.color.blue400,
      backgroundColor: vars.color.white,
      boxShadow: '0 0 0 3px rgba(59,130,246,0.1)',
    },
    '&::placeholder': {
      color: vars.color.grey400,
    },
  },
});

export const sendButton = style({
  width: 38,
  height: 38,
  borderRadius: '50%',
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  flexShrink: 0,
  transition: 'all 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blue600,
      transform: 'scale(1.05)',
    },
    '&:active': {
      backgroundColor: vars.color.blue700,
      transform: 'scale(0.95)',
    },
  },
});

/* ── AppBar 우측 아이콘 ── */
export const headerIcons = style({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});

export const headerIconButton = style({
  width: 34,
  height: 34,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.grey700,
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
  },
});
