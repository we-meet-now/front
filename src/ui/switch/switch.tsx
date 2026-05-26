import { cx } from '../utils';
import * as styles from './switch.css';

type SwitchProps = {
  on: boolean;
  onToggle: () => void;
};

export const Switch = ({ on, onToggle }: SwitchProps) => (
  <div
    className={cx(styles.track, on && styles.trackOn)}
    onClick={onToggle}
  >
    <div className={cx(styles.thumb, on && styles.thumbOn)} />
  </div>
);
