import { useLocation, useNavigate, useParams } from 'react-router-dom';

import HomeIcon from '@/assets/icons/home.svg?react';
import CalendarIcon from '@/assets/icons/calendar.svg?react';
import ChatIcon from '@/assets/icons/chat.svg?react';
import GalleryIcon from '@/assets/icons/gallery.svg?react';
import MypageIcon from '@/assets/icons/mypage.svg?react';

import { cx } from '../utils';

import * as styles from './gnb.css';

const MENUS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'calendar', label: '캘린더', Icon: CalendarIcon },
  { key: 'chat', label: '톡', Icon: ChatIcon },
  { key: 'gallery', label: '갤러리', Icon: GalleryIcon },
  { key: 'mypage', label: '마이', Icon: MypageIcon },
];

export const GNB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const currentPath = location.pathname;

  const handleNavigate = (key: string) => {
    if (key === 'mypage') {
      navigate('/mypage');
      return;
    }
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
            <menu.Icon className={styles.icon} />
            <div className={styles.label}>{menu.label}</div>
            {isActive && <div className={styles.activeBar} />}
          </div>
        );
      })}
    </nav>
  );
};
