import type { MapSearchResult } from '@/api/map/search';

import * as styles from './place-info-card.css';

type PlaceInfoCardProps = {
  place: MapSearchResult;
  onClose: () => void;
};

/** tel: 링크에는 숫자와 +만 남긴다 */
const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const PlaceInfoCard = ({ place, onClose }: PlaceInfoCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.name}>{place.name}</span>
          {place.category && <span className={styles.category}>{place.category}</span>}
        </div>
        <button className={styles.closeButton} onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>

      {place.detail && <p className={styles.address}>{place.detail}</p>}

      {(place.phone || place.placeUrl) && (
        <div className={styles.actions}>
          {place.phone && (
            <a className={styles.actionButton} href={toTelHref(place.phone)}>
              ☎ {place.phone}
            </a>
          )}
          {place.placeUrl && (
            <a
              className={styles.actionButton}
              href={place.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              카카오맵에서 보기
            </a>
          )}
        </div>
      )}
    </div>
  );
};
