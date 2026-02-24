import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import { cx } from '../utils';

import * as styles from './page-layout.css';

export type LayoutProps = {
  header?: ReactNode;
  footer?: ReactNode; // ⭐ 추가
} & ComponentProps<'div'>;

export const PageLayout = (props: PropsWithChildren<LayoutProps>) => {
  const { header, footer, children, className } = props;

  return (
    <div className={styles.wrapper}>
      {header}

      <div className={cx(styles.content, className)}>{children}</div>

      {footer}
    </div>
  );
};
