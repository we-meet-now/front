import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/* 프로필 영역 */
export const profileSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 32,
  paddingBottom: 28,
  backgroundColor: vars.color.white,
});

export const avatarWrapper = style({
  position: 'relative',
  width: 88,
  height: 88,
  marginBottom: 14,
});

export const avatar = style({
  width: 88,
  height: 88,
  borderRadius: '50%',
  backgroundColor: vars.color.grey100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '40px',
  color: vars.color.grey400,
});

export const editBadge = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 28,
  height: 28,
  borderRadius: '50%',
  backgroundColor: vars.color.blue500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  color: vars.color.white,
  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
  cursor: 'pointer',
});

export const userName = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  marginBottom: 4,
});

export const userPhone = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  marginBottom: 16,
});

export const logoutButton = style({
  padding: '6px 18px',
  borderRadius: 20,
  border: `1px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.s,
  color: vars.color.grey700,
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
    '&:active': {
      backgroundColor: vars.color.grey200,
    },
  },
});

/* 메뉴 리스트 */
export const menuSection = style({
  marginTop: 8,
  backgroundColor: vars.color.white,
});

export const menuItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: `1px solid ${vars.color.grey100}`,
  fontSize: vars.fontSize.m,
  color: vars.color.grey800,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.grey100,
    },
    '&:active': {
      backgroundColor: vars.color.grey200,
    },
  },
});

export const menuArrow = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey400,
});

/* 하이라이트 메뉴 */
export const highlightItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  marginTop: 8,
  backgroundColor: vars.color.blue50,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.blue600,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  selectors: {
    '&:hover': {
      backgroundColor: vars.color.blue100,
    },
  },
});
