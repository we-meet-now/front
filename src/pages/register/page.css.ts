import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const container = style({
  padding: '24px 16px',
  display: 'flex',
  justifyContent: 'center',
  // 기본값(stretch)이면 카드가 화면 높이로 고정돼 내용이 넘칠 때 버튼·여백이 눌린다.
  // 카드는 내용 높이만큼 커지고 넘치는 부분은 스크롤되도록 위쪽 정렬한다
  alignItems: 'flex-start',
});

export const card = style({
  width: '100%',
  maxWidth: 360,
  display: 'flex',
  flexDirection: 'column',
  // 스크롤 컨테이너의 padding-bottom은 iOS Safari에서 무시될 수 있어 콘텐츠 쪽에 하단 여백을 둔다.
  // 홈 인디케이터가 있는 기기는 safe-area만큼 더 띄운다
  paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
});

export const header = style({
  marginBottom: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

export const title = style({
  fontSize: vars.fontSize.xxxl,
  fontWeight: vars.fontWeight.bold,
  marginBottom: 8,
});

export const description = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey600,
  lineHeight: 1.4,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const inlineField = style({
  display: 'flex',
  gap: 8,
});

export const label = style({
  fontSize: vars.fontSize.m,
  color: vars.color.grey900,
});

export const input = style({
  flex: 1,
  padding: '8px 12px',
  borderRadius: 8,
  border: `1px solid ${vars.color.grey500}`,
  fontSize: vars.fontSize.m,

  selectors: {
    '&::placeholder': {
      color: vars.color.grey400,
    },
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.green500,
    },
  },
});

export const verifyButton = style({
  padding: '0 12px',
  height: 44,

  borderRadius: 8,
  border: `1px solid ${vars.color.green500}`,
  backgroundColor: vars.color.white,
  color: vars.color.green600,

  fontSize: vars.fontSize.s,
  cursor: 'pointer',
});

export const helperText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
});

export const verifiedText = style({
  fontSize: vars.fontSize.s,
  color: vars.color.green600,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const errorText = style({
  fontSize: vars.fontSize.xs,
  color: '#ef4444',
});

export const verifyButtonDisabled = style({
  padding: '0 12px',
  height: 44,
  borderRadius: 8,
  border: `1px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.grey100,
  color: vars.color.grey400,
  fontSize: vars.fontSize.s,
  cursor: 'not-allowed',
  whiteSpace: 'nowrap',
});

export const verifyButtonActive = style({
  padding: '0 12px',
  height: 44,
  borderRadius: 8,
  border: `1px solid ${vars.color.green500}`,
  backgroundColor: vars.color.white,
  color: vars.color.green600,
  fontSize: vars.fontSize.s,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.15s',
  selectors: {
    '&:active': {
      opacity: 0.7,
    },
  },
});

const fadeSlideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-6px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const codeSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  animation: `${fadeSlideIn} 0.2s ease`,
});
