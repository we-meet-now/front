import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/ui/theme.css';

export const markdown = style({
  fontSize: vars.fontSize.s,
  color: vars.color.grey700,
  lineHeight: 1.6,
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
});

export const tableWrapper = style({
  overflowX: 'auto',
  margin: '8px 0 12px',
});

globalStyle(`${markdown} > :first-child`, { marginTop: 0 });
globalStyle(`${markdown} > :last-child`, { marginBottom: 0 });

globalStyle(`${markdown} h2`, {
  margin: '20px 0 8px',
  fontSize: vars.fontSize.m,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

globalStyle(`${markdown} h3`, {
  margin: '16px 0 6px',
  fontSize: vars.fontSize.s,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

globalStyle(`${markdown} p`, { margin: '0 0 8px' });

globalStyle(`${markdown} ul, ${markdown} ol`, {
  margin: '0 0 8px',
  paddingLeft: 18,
});

globalStyle(`${markdown} li`, { marginBottom: 4 });

globalStyle(`${markdown} strong`, {
  fontWeight: vars.fontWeight.bold,
  color: vars.color.grey900,
});

globalStyle(`${markdown} table`, {
  width: '100%',
  minWidth: 360,
  borderCollapse: 'collapse',
  fontSize: vars.fontSize.xs,
  lineHeight: 1.5,
});

globalStyle(`${markdown} th, ${markdown} td`, {
  padding: '8px 6px',
  border: `1px solid ${vars.color.grey200}`,
  textAlign: 'left',
  verticalAlign: 'top',
});

globalStyle(`${markdown} th`, {
  backgroundColor: vars.color.grey100,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.grey900,
  whiteSpace: 'nowrap',
});

globalStyle(`${markdown} blockquote`, {
  margin: '0 0 12px',
  padding: '8px 12px',
  borderLeft: `3px solid ${vars.color.green500}`,
  backgroundColor: vars.color.grey100,
  color: vars.color.grey800,
});

globalStyle(`${markdown} blockquote p`, { margin: 0 });

globalStyle(`${markdown} a`, {
  color: vars.color.blue600,
  wordBreak: 'break-all',
});
