import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { cx } from '../utils';

import * as styles from './gnb.css';

const MENUS = [
  { key: 'home', label: '홈', icon: '🏠' },
  { key: 'calendar', label: '캘린더', icon: '📅' },
  { key: 'chat', label: '톡', icon: '💬' },
  { key: 'gallery', label: '갤러리', icon: '🖼️' },
  { key: 'mypage', label: '마이', icon: '👤' },
];

export const GNB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const currentPath = location.pathname;

  const handleNavigate = (key: string) => {
    navigate(`/meeting/${roomId}/${key}`);
  };

  return (
    <nav className={styles.container}>
      {MENUS.map((menu) => {
        const isActive = currentPath.includes(`/${menu.key}`);

        return (
          <div
            key={menu.key}
            className={cx(styles.item, isActive && styles.activeItem)}
            onClick={() => handleNavigate(menu.key)}
          >
            <div className={styles.icon}>{menu.icon}</div>
            <div className={styles.label}>{menu.label}</div>
          </div>
        );
      })}
    </nav>
  );
};
