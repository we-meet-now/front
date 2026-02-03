import { assignInlineVars } from '@vanilla-extract/dynamic';

import { ArrowLeftLogo } from '@/assets';

import { cx } from '../utils';

import { vars } from '../theme.css';
import * as styles from './app-bar.css';

export type AppBarTitleSize = 's' | 'm' | 'l';

export type AppBarProps = {
  title: string;
  subTitle?: string;

  titleSize?: AppBarTitleSize;

  showBackButton?: boolean;
  onBackClick?: () => void;

  rightSlot?: React.ReactNode;
};

const titleSizeMap: Record<AppBarTitleSize, string> = {
  s: vars.fontSize.s,
  m: vars.fontSize.m,
  l: vars.fontSize.l,
};

export const AppBar = ({
  title,
  subTitle,
  titleSize = 'm',
  showBackButton = false,
  onBackClick,
  rightSlot,
}: AppBarProps) => {
  return (
    <header
      className={styles.appBar}
      style={assignInlineVars({
        [styles.titleSizeVar]: titleSizeMap[titleSize],
      })}
    >
      <div className={cx(styles.side, styles.left)}>
        {showBackButton && (
          <div className={styles.backButton} onClick={onBackClick}>
            <ArrowLeftLogo className={styles.backIcon} />
          </div>
        )}
      </div>

      <div className={styles.titleWrapper}>
        <div className={styles.title}>{title}</div>
        {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
      </div>

      <div className={cx(styles.side, styles.right)}>{rightSlot}</div>
    </header>
  );
};
