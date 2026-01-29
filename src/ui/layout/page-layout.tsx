import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import { cx } from '../utils';
import * as styles from './page-layout.css';

export type LayoutProps = {
  header?: ReactNode;
} & ComponentProps<'div'>;

export const PageLayout = (props: PropsWithChildren<LayoutProps>) => {
  const { header, children, className } = props;

  return (
    <>
      {header}
      <div className={cx(styles.pageLayoutContent, className)}>{children}</div>
    </>
  );
};
