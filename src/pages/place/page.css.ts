import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const body = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '0 20px',
  overflowY: 'auto',
});

export const footer = style({
  padding: '12px 20px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const heroSection = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '0 12px',
});

export const heroIcon = style({
  width: 72,
  height: 72,
  borderRadius: 24,
  backgroundColor: vars.color.blue50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 24,
  fontSize: 32,
});

export const heroTitle = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  letterSpacing: '-0.6px',
  lineHeight: 1.3,
  marginBottom: 12,
  color: vars.color.grey900,
});

export const heroDesc = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  lineHeight: 1.55,
});

export const guestBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginTop: 18,
  padding: '6px 14px',
  borderRadius: 18,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.xs,
  color: vars.color.grey600,
  fontWeight: vars.fontWeight.medium,
});

export const primaryButton = style({
  width: '100%',
  height: 50,
  borderRadius: 8,
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  border: 'none',
  cursor: 'pointer',
  letterSpacing: '-0.3px',
  transition: 'opacity 120ms',
  selectors: {
    '&:active': { opacity: 0.85 },
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  },
});

export const secondaryButton = style({
  width: '100%',
  height: 50,
  borderRadius: 8,
  backgroundColor: vars.color.grey100,
  color: vars.color.grey900,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  border: `1px solid ${vars.color.grey200}`,
  cursor: 'pointer',
  letterSpacing: '-0.3px',
  transition: 'opacity 120ms',
  selectors: {
    '&:active': { opacity: 0.85 },
  },
});

export const textButton = style({
  width: '100%',
  padding: '12px 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
  textAlign: 'center',
});

export const caption = style({
  textAlign: 'center',
  fontSize: vars.fontSize.xs,
  color: vars.color.grey400,
});

export const section = style({
  marginBottom: 24,
});

export const sectionTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  letterSpacing: '-0.3px',
  marginBottom: 12,
  marginTop: 24,
  color: vars.color.grey900,
});

export const label = style({
  display: 'block',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey700,
  marginBottom: 7,
});

export const input = style({
  width: '100%',
  height: 50,
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 8,
  padding: '0 14px',
  fontSize: vars.fontSize.m,
  color: vars.color.grey900,
  backgroundColor: vars.color.white,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: vars.color.grey900,
      borderWidth: '1.5px',
    },
    '&::placeholder': {
      color: vars.color.grey400,
    },
  },
});

export const helperText = style({
  marginTop: 6,
  fontSize: vars.fontSize.xxs,
  color: vars.color.grey500,
  lineHeight: 1.45,
});

export const card = style({
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 12,
  padding: 16,
  backgroundColor: vars.color.white,
  marginBottom: 10,
});

export const noticeBox = style({
  backgroundColor: vars.color.blue50,
  borderRadius: 8,
  padding: '12px 14px',
  fontSize: vars.fontSize.xs,
  color: vars.color.blue600,
  lineHeight: 1.5,
  fontWeight: vars.fontWeight.medium,
});

export const noticeBoxGrey = style({
  backgroundColor: vars.color.grey100,
  borderRadius: 8,
  padding: '12px 14px',
  fontSize: vars.fontSize.xs,
  color: vars.color.grey700,
  lineHeight: 1.5,
});

export const mockMap = style({
  height: 180,
  borderRadius: 12,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: '#F3F6FA',
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: `
    repeating-linear-gradient(0deg, #E9EDF2 0 1px, transparent 1px 26px),
    repeating-linear-gradient(90deg, #E9EDF2 0 1px, transparent 1px 26px)
  `,
  marginBottom: 16,
});

export const mapPin = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 2,
});

export const mapPinDot = style({
  width: 28,
  height: 28,
  borderRadius: '50%',
  backgroundColor: vars.color.blue500,
  border: '3px solid white',
  boxShadow: '0 3px 10px rgba(59,130,246,0.45)',
});

export const mapPinLabel = style({
  marginTop: 6,
  backgroundColor: vars.color.grey900,
  color: vars.color.white,
  fontSize: 11,
  fontWeight: vars.fontWeight.bold,
  padding: '4px 9px',
  borderRadius: 13,
  whiteSpace: 'nowrap',
});

export const mapMiniPin = style({
  position: 'absolute',
  width: 14,
  height: 14,
  borderRadius: '50%',
  backgroundColor: vars.color.grey400,
  border: '2px solid white',
});

export const memberRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 0',
  borderBottom: `1px solid ${vars.color.grey100}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const avatar = style({
  width: 40,
  height: 40,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.white,
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  flexShrink: 0,
});

export const memberInfo = style({
  flex: 1,
});

export const memberName = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey900,
});

export const memberSub = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  marginTop: 2,
});

export const chipRow = style({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  marginBottom: 16,
});

export const chip = style({
  height: 36,
  padding: '0 14px',
  borderRadius: 18,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey700,
  cursor: 'pointer',
  transition: '120ms',
});

export const chipActive = style({
  backgroundColor: vars.color.grey900,
  borderColor: vars.color.grey900,
  color: vars.color.white,
});

export const placeCard = style({
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 12,
  padding: 14,
  marginBottom: 10,
  cursor: 'pointer',
  transition: '120ms',
  selectors: {
    '&:hover': {
      borderColor: vars.color.grey300,
    },
  },
});

export const placeCardSelected = style({
  borderColor: vars.color.blue500,
  borderWidth: 1.5,
  backgroundColor: vars.color.blue50,
});

export const placeName = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  letterSpacing: '-0.3px',
  color: vars.color.grey900,
  marginBottom: 4,
});

export const placeMeta = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  marginTop: 3,
});

export const placeReason = style({
  display: 'inline-block',
  marginTop: 7,
  fontSize: vars.fontSize.xxs,
  color: vars.color.blue600,
  backgroundColor: vars.color.blue50,
  borderRadius: 4,
  padding: '4px 7px',
  fontWeight: vars.fontWeight.medium,
});

export const shareCard = style({
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 12,
  padding: 16,
  backgroundColor: vars.color.grey100,
  marginBottom: 16,
});

export const shareLink = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.blue500,
  marginTop: 10,
  wordBreak: 'break-all',
});

export const shareButtons = style({
  display: 'flex',
  gap: 10,
  marginTop: 8,
});

export const shareIconButton = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  padding: '14px 8px',
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 12,
  backgroundColor: vars.color.white,
  cursor: 'pointer',
  fontSize: 22,
  transition: '120ms',
  selectors: {
    '&:active': { backgroundColor: vars.color.grey100 },
  },
});

export const shareIconLabel = style({
  fontSize: vars.fontSize.xxs,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
});

export const smallButton = style({
  height: 36,
  padding: '0 14px',
  borderRadius: 8,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey700,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: '120ms',
  selectors: {
    '&:active': { backgroundColor: vars.color.grey100 },
  },
});

export const outlineButton = style({
  width: '100%',
  height: 50,
  borderRadius: 8,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey700,
  cursor: 'pointer',
  transition: '120ms',
  selectors: {
    '&:active': { backgroundColor: vars.color.grey100 },
  },
});

export const inputRow = style({
  display: 'flex',
  gap: 8,
  alignItems: 'flex-start',
  marginBottom: 12,
});

export const directInputName = style({
  width: 80,
  height: 50,
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 8,
  padding: '0 10px',
  fontSize: vars.fontSize.s,
  color: vars.color.grey900,
  backgroundColor: vars.color.white,
  outline: 'none',
  flexShrink: 0,
  selectors: {
    '&:focus': { borderColor: vars.color.grey900 },
    '&::placeholder': { color: vars.color.grey400 },
  },
});

export const directInputAddr = style({
  flex: 1,
  height: 50,
  border: `1px solid ${vars.color.grey200}`,
  borderRadius: 8,
  padding: '0 14px',
  fontSize: vars.fontSize.s,
  color: vars.color.grey900,
  backgroundColor: vars.color.white,
  outline: 'none',
  selectors: {
    '&:focus': { borderColor: vars.color.grey900 },
    '&::placeholder': { color: vars.color.grey400 },
  },
});

export const removeButton = style({
  width: 36,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: 18,
  color: vars.color.grey400,
  flexShrink: 0,
  selectors: {
    '&:hover': { color: vars.color.grey700 },
  },
});

export const travelRow = style({
  display: 'flex',
  alignItems: 'center',
  padding: '14px 0',
  borderBottom: `1px solid ${vars.color.grey100}`,
  selectors: {
    '&:last-child': { borderBottom: 'none' },
  },
});

export const travelName = style({
  flex: 1,
  fontSize: vars.fontSize.s,
  color: vars.color.grey900,
});

export const travelTime = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const ctaBanner = style({
  border: `1.5px solid ${vars.color.blue500}`,
  borderRadius: 12,
  padding: 16,
  backgroundColor: vars.color.blue50,
  marginTop: 24,
  marginBottom: 8,
});

export const ctaTitle = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.blue600,
  marginBottom: 6,
});

export const ctaDesc = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.blue500,
  lineHeight: 1.5,
  marginBottom: 12,
});

export const nickChips = style({
  display: 'flex',
  gap: 8,
  marginTop: 10,
  flexWrap: 'wrap',
});

export const nickChip = style({
  height: 34,
  padding: '0 14px',
  borderRadius: 18,
  border: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey700,
  cursor: 'pointer',
});

export const nickChipActive = style({
  backgroundColor: vars.color.blue50,
  borderColor: vars.color.blue500,
  color: vars.color.blue600,
});

export const stepIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  padding: '20px 0 4px',
});

export const stepCircle = style({
  width: 26,
  height: 26,
  borderRadius: '50%',
  backgroundColor: vars.color.grey200,
  color: vars.color.grey400,
  fontSize: vars.fontSize.xxs,
  fontWeight: vars.fontWeight.bold,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const stepCircleActive = style({
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
});

export const stepCircleDone = style({
  backgroundColor: vars.color.green500,
  color: vars.color.white,
});

export const stepLine = style({
  width: 34,
  height: 2,
  backgroundColor: vars.color.grey200,
});

export const stepLineDone = style({
  backgroundColor: vars.color.green500,
});

export const loadingBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 0',
  gap: 16,
});

export const spinner = style({
  width: 36,
  height: 36,
  border: `3px solid ${vars.color.grey200}`,
  borderTopColor: vars.color.blue500,
  borderRadius: '50%',
  animationName: spin,
  animationDuration: '0.7s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
});

export const loadingText = style({
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

export const loadingSubText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  marginTop: -8,
});

export const divider = style({
  height: 8,
  backgroundColor: vars.color.grey100,
  margin: '24px -20px',
});

export const countText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey400,
  fontWeight: vars.fontWeight.medium,
});

export const selectedChips = style({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  marginBottom: 10,
});

export const selectedChipItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  height: 32,
  padding: '0 12px',
  borderRadius: 16,
  backgroundColor: vars.color.blue500,
  color: vars.color.white,
  fontSize: vars.fontSize.xxs,
  fontWeight: vars.fontWeight.medium,
});
