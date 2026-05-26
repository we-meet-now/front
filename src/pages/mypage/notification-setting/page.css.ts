import { style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const tabBar = style({
  display: 'flex',
  borderBottom: `1px solid ${vars.color.grey200}`,
  backgroundColor: vars.color.white,
  position: 'sticky',
  top: 0,
  zIndex: 10,
});

export const tab = style({
  flex: 1,
  textAlign: 'center',
  padding: '12px 0',
  fontSize: vars.fontSize.s,
  color: vars.color.grey500,
  fontWeight: vars.fontWeight.medium,
  cursor: 'pointer',
});

export const activeTab = style({
  color: vars.color.blue500,
  borderBottom: `2px solid ${vars.color.blue500}`,
});

export const divider = style({
  height: 8,
  backgroundColor: vars.color.grey100,
});

/* 모든 행의 기본 레이아웃 — 좌우 패딩 20px 통일 */
const baseRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 20,
  paddingRight: 20,
  borderBottom: `1px solid ${vars.color.grey100}`,
} as const;

/* 섹션 제목 행 (굵은 텍스트 + 토글) */
export const sectionRow = style({
  ...baseRow,
  paddingTop: 20,
  paddingBottom: 14,
});

export const sectionTitle = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

/* 일반 설정 행 */
export const row = style({
  ...baseRow,
  paddingTop: 14,
  paddingBottom: 14,
});

export const rowLabel = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey800,
});

/* 하위 설정 행 (들여쓰기) */
export const subRow = style({
  ...baseRow,
  paddingTop: 13,
  paddingBottom: 13,
  paddingLeft: 34,
});

export const subRowLabel = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey600,
});

/* 구획 대제목 */
export const sectionGroupHeader = style({
  padding: '28px 20px 12px',
  borderBottom: `1px solid ${vars.color.grey200}`,
});

export const sectionGroupTitle = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

/* 설명 텍스트만 있는 섹션 (토글 없음) */
export const descSection = style({
  padding: '16px 20px 4px',
});

export const descSectionTitle = style({
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
  marginBottom: 4,
});

export const sectionDesc = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.grey400,
  lineHeight: '1.5',
  marginBottom: 8,
});

/* 옵션 버튼 그룹 (2-way, 3-way 선택) */
export const optionGroup = style({
  display: 'flex',
  gap: 6,
});

export const optionButton = style({
  padding: '5px 12px',
  borderRadius: 20,
  border: `1px solid ${vars.color.grey300}`,
  backgroundColor: vars.color.white,
  fontSize: vars.fontSize.xs,
  color: vars.color.grey500,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
});

export const optionButtonActive = style({
  backgroundColor: vars.color.blue500,
  borderColor: vars.color.blue500,
  color: vars.color.white,
});

/* 시간 범위 선택 행 */
export const timeRangeRow = style({
  ...baseRow,
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 10,
  paddingTop: 14,
  paddingBottom: 14,
});

export const timeRangeLabel = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey800,
});
