// theme.css.ts
import { fontSize, fontWeight, palette } from './tokens';

import { createGlobalTheme } from '@vanilla-extract/css';

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
