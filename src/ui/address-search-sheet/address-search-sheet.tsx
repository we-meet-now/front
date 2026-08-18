import { useState } from 'react';

import * as styles from './address-search-sheet.css';

type AddressResult = {
  name: string;
  address: string;
};

// TODO(백엔드 연동): 검색 결과가 아래 더미 배열을 문자열 포함 여부로 필터링한 것임.
// 백엔드에 주소 검색/지오코딩 API가 아예 없음(카카오·네이버 로컬 API를 프록시하는 신규 엔드포인트 필요).
// API가 생기면 이 배열을 지우고, query 변경 시 apiClient('/address/search', { method: 'POST', body: { query } })
// 같은 형태로 교체하면 됨. 응답은 { name, address, lat, lng } 리스트를 기대.
const DUMMY_ADDRESSES: AddressResult[] = [
  { name: '동탄대로 123', address: '경기도 화성시 동탄대로 123' },
  { name: '동탄대로 456', address: '경기도 화성시 동탄대로 456' },
  { name: '월드컵북로 21', address: '서울시 마포구 월드컵북로 21' },
  { name: '테헤란로 152', address: '서울시 강남구 테헤란로 152' },
  { name: '역삼로 210', address: '서울시 강남구 역삼로 210' },
  { name: '수원역로 88', address: '경기도 수원시 수원역로 88' },
];

// TODO(백엔드 연동): navigator.geolocation으로 얻은 실제 좌표(lat/lng)를 무시하고 항상 이 고정 주소를 반환함.
// 좌표 → 주소 변환(역지오코딩) API가 필요함(백엔드에 없음, 카카오/네이버 로컬 API 프록시로 신규 개발 필요).
const CURRENT_LOCATION_ADDRESS = '경기도 화성시 동탄대로 123';

type AddressSearchSheetProps = {
  onSelect: (address: string) => void;
  onClose: () => void;
};

export const AddressSearchSheet = ({ onSelect, onClose }: AddressSearchSheetProps) => {
  const [query, setQuery] = useState('');
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const trimmed = query.trim();
  const results = trimmed
    ? DUMMY_ADDRESSES.filter((a) => a.name.includes(trimmed) || a.address.includes(trimmed))
    : [];

  const handleSelect = (address: string) => {
    onSelect(address);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('이 브라우저는 위치 정보를 지원하지 않아요');
      return;
    }
    setLocationError(null);
    setLocating(true);
    // getCurrentPosition triggers the browser's own location-permission prompt.
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocating(false);
        handleSelect(CURRENT_LOCATION_ADDRESS);
      },
      (error) => {
        setLocating(false);
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? '위치 정보 접근이 거부됐어요'
            : '현재 위치를 가져오지 못했어요',
        );
      },
      { timeout: 8000 },
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.grabber} />
        <div className={styles.title}>출발지 검색</div>
        <input
          className={styles.searchInput}
          placeholder="지번, 도로명, 건물명으로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button
          type="button"
          className={styles.myLocationButton}
          onClick={handleUseCurrentLocation}
          disabled={locating}
        >
          📍 {locating ? '위치 확인 중...' : '현재 위치로 찾기'}
        </button>
        {locationError && <div className={styles.locationError}>{locationError}</div>}
        <div className={styles.resultList}>
          {trimmed && results.length === 0 && (
            <div className={styles.emptyText}>검색 결과가 없어요</div>
          )}
          {results.map((r) => (
            <div
              key={r.address}
              className={styles.resultRow}
              onClick={() => handleSelect(r.address)}
            >
              <div className={styles.resultName}>{r.name}</div>
              <div className={styles.resultAddr}>{r.address}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
