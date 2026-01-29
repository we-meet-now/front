import type { ComponentProps } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { cx } from '../utils';
import * as styles from './spacer.css';

type SpacerProps = {
  size: number;
} & ComponentProps<'div'>;

export const Spacer = ({ size: spaceSize, className, ...restProps }: SpacerProps) => {
  return (
    <div
      className={cx(styles.spacer, className)}
      style={assignInlineVars({
        [styles.size]: `${spaceSize}px`,
      })}
      {...restProps}
    />
  );
};
