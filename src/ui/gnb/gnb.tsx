import { useLocation, useNavigate } from 'react-router-dom';

import CalendarIcon from '@/assets/icons/calendar.svg?react';
import ChatIcon from '@/assets/icons/chat.svg?react';
import GalleryIcon from '@/assets/icons/gallery.svg?react';
import HomeIcon from '@/assets/icons/home.svg?react';
import MypageIcon from '@/assets/icons/mypage.svg?react';

import { cx } from '../utils';

import * as styles from './gnb.css';

const MENUS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'calendar', label: '캘린더', Icon: CalendarIcon },
  { key: 'chat', label: '채팅', Icon: ChatIcon },
  { key: 'gallery', label: '갤러리', Icon: GalleryIcon },
  { key: 'mypage', label: '마이', Icon: MypageIcon },
];

/**
 * 메인 탭은 특정 모임에 속하지 않으므로 roomId 없이 이동한다.
 * (마이페이지처럼 roomId가 없는 화면에서도 GNB가 /meeting/undefined로 가지 않도록)
 */
export const GNB = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // `/mypage/calendar-setting`에서 캘린더 탭까지 켜지지 않도록 문자열 포함이 아니라 경로 단위로 비교한다
  const segments = location.pathname.split('/');

  return (
    <nav className={styles.container}>
      {MENUS.map((menu) => {
        const isActive = segments.includes(menu.key);

        return (
          <div
            key={menu.key}
            className={cx(styles.item, isActive && styles.activeItem)}
            onClick={() => navigate(`/${menu.key}`)}
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
