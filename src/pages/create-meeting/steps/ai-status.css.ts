import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

/* AI 추천 상태 박스. 2단계(모임 유형)와 3단계(장소)가 같은 모양을 쓰도록 공용으로 둔다 */

export const aiBox = style({
  width: '80%',
  padding: '16px',
  borderRadius: 12,
  backgroundColor: vars.color.green50,
  color: vars.color.green700,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
});

export const aiHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
});

export const aiSub = style({
  fontSize: vars.fontSize.xs,
  marginTop: 4,
  fontWeight: vars.fontWeight.regular,
});

export const statusBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  padding: '2px 8px',
  borderRadius: 999,
  fontSize: vars.fontSize.xxs,
  fontWeight: vars.fontWeight.medium,
});

export const statusLoading = style({
  backgroundColor: vars.color.white,
  color: vars.color.green700,
});

export const statusDone = style({
  backgroundColor: vars.color.green500,
  color: vars.color.white,
});

export const statusError = style({
  backgroundColor: vars.color.white,
  color: '#ef4444',
});

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinner = style({
  width: 10,
  height: 10,
  borderRadius: '50%',
  border: `2px solid ${vars.color.green500}`,
  borderTopColor: 'transparent',
  animation: `${spin} 0.8s linear infinite`,
});
