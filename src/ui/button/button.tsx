import type { ComponentProps } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { cx, fluid, fluidText } from '../utils';

import { vars } from '../theme.css';
import * as styles from './button.css';

type ButtonSize = 'xs' | 's' | 'm' | 'l';

type ButtonColor = 'blue' | 'green' | 'grey' | 'black' | 'white';

type ButtonProps = {
  size?: ButtonSize;
  color?: ButtonColor;
} & ComponentProps<'button'>;

const sizeMap: Record<
  ButtonSize,
  { height: number; paddingX: number; minWidth: number; fontSizeMin: number; fontSizeMax: number }
> = {
  xs: { height: 30, paddingX: 10, minWidth: 70, fontSizeMin: 11, fontSizeMax: 12 },
  s: { height: 32, paddingX: 12, minWidth: 120, fontSizeMin: 12, fontSizeMax: 14 },
  m: { height: 44, paddingX: 16, minWidth: 231, fontSizeMin: 14, fontSizeMax: 16 },
  l: { height: 48, paddingX: 20, minWidth: 327, fontSizeMin: 14, fontSizeMax: 16 },
};

const colorMap: Record<ButtonColor, { bg: string; text: string }> = {
  blue: {
    bg: vars.color.blue500,
    text: vars.color.white,
  },
  green: {
    bg: vars.color.green500,
    text: vars.color.white,
  },
  grey: {
    bg: vars.color.grey300,
    text: vars.color.black,
  },
  black: {
    bg: vars.color.black,
    text: vars.color.white,
  },
  white: {
    bg: vars.color.white,
    text: vars.color.black,
  },
};

export const Button = ({ size = 'm', color = 'blue', className, style, ...rest }: ButtonProps) => {
  const sizeStyle = sizeMap[size];
  const colorStyle = colorMap[color];

  return (
    <button
      className={cx(styles.button, className)}
      style={{
        ...assignInlineVars({
          [styles.heightVar]: fluid(sizeStyle.height),
          [styles.paddingXVar]: fluid(sizeStyle.paddingX),
          [styles.minWidthVar]: fluid(sizeStyle.minWidth),
          [styles.bgColorVar]: colorStyle.bg,
          [styles.textColorVar]: colorStyle.text,
        }),
        fontSize: fluidText(sizeStyle.fontSizeMin, sizeStyle.fontSizeMax),
        ...style,
      }}
      {...rest}
    />
  );
};
