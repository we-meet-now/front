export type GeoPoint = { lat: number; lng: number };

/** 서버 응답의 장소명에는 공백이 두 칸씩 들어오는 경우가 있다. */
export const normalizePlaceName = (name: string) => name.trim().replace(/\s+/g, ' ');

/**
 * 서버가 '군포역  1호선'처럼 노선명을 붙여 내려주므로 화면·검색어에는 역 이름만 쓴다.
 * 토큰이 하나뿐이면(= 역명만 온 경우) 그대로 둔다.
 */
export const formatStationName = (name: string) => {
  const tokens = normalizePlaceName(name).split(' ');
  if (tokens.length > 1 && /선$/.test(tokens[tokens.length - 1])) tokens.pop();
  return tokens.join(' ');
};

/**
 * 좌표를 지도 목업 박스 안의 % 위치로 변환한다.
 * 점들이 한곳에 몰려도 납작해지지 않도록 최소 범위를 둔다.
 */
export const toBoxPosition = (point: GeoPoint, all: GeoPoint[]) => {
  const lats = all.map((p) => p.lat);
  const lngs = all.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latSpan = Math.max(maxLat - minLat, 0.01);
  const lngSpan = Math.max(maxLng - minLng, 0.01);

  const toPercent = (value: number, min: number, span: number) => 15 + ((value - min) / span) * 70;

  return {
    left: `${toPercent(point.lng, minLng, lngSpan)}%`,
    // 위도는 위쪽이 큰 값이라 화면 좌표계에서 뒤집는다
    top: `${100 - toPercent(point.lat, minLat, latSpan)}%`,
  };
};
