import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BellIcon from '@/assets/icons/bell.svg?react';

import * as styles from './page.css';

// 목업: 읽지 않은 알림 수 (notification 페이지의 INITIAL_NOTIFICATIONS 개수와 동일)
const UNREAD_COUNT = 9;

export const HomePage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (typeof naver === 'undefined' || !naver.maps) {
      console.warn('네이버 지도 API가 로드되지 않았습니다.');
      return;
    }

    try {
      const center = new naver.maps.LatLng(37.4979, 127.0276);

      const map = new naver.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_CENTER,
        },
      });

      new naver.maps.Marker({
        position: center,
        map,
      });
    } catch (e) {
      console.warn('네이버 지도 초기화 실패:', e);
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* ── 검색바 ── */}
      <div className={styles.searchBar}>🔍 Search for places</div>

      {/* ── 알람 버튼 (플로팅) ── */}
      <button
        className={styles.alarmButton}
        onClick={() => navigate(`/meeting/${roomId}/notification`)}
      >
        <BellIcon className={styles.bellIcon} />
        {UNREAD_COUNT > 0 && (
          <span className={styles.alarmBadge}>{UNREAD_COUNT}</span>
        )}
      </button>

      {/* ── 네이버 지도 ── */}
      <div ref={mapRef} className={styles.mapArea} />
    </div>
  );
};
