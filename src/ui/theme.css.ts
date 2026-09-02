// theme.css.ts
import { createGlobalTheme } from '@vanilla-extract/css';

import { fontSize, fontWeight, palette } from './tokens';

export const vars = createGlobalTheme(':root', {
  color: {
    ...palette.blue,
    ...palette.green,
    ...palette.grey,
    white: palette.white,
    black: palette.black,
  },
  fontSize: fontSize,
  fontWeight: fontWeight,
});
