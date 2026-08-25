export type GeoPoint = { lat: number; lng: number };

/** 출발지들의 좌표 평균. 중간위치 산출 API가 없어 클라이언트에서 계산한다. */
export const computeCentroid = (points: GeoPoint[]): GeoPoint => ({
  lat: points.reduce((sum, p) => sum + p.lat, 0) / points.length,
  lng: points.reduce((sum, p) => sum + p.lng, 0) / points.length,
});

/** 위경도 차이를 km로 환산 (위도 1도 ≈ 111km, 경도는 위도에 따라 보정) */
export const distanceKm = (a: GeoPoint, b: GeoPoint) => {
  const latKm = (a.lat - b.lat) * 111;
  const lngKm = (a.lng - b.lng) * 111 * Math.cos((a.lat * Math.PI) / 180);
  return Math.sqrt(latKm ** 2 + lngKm ** 2);
};

/** 대중교통 소요시간 추정: 기본 대기 8분 + 평균 25km/h */
export const estimateTransitMinutes = (km: number) => Math.max(5, Math.round(8 + (km / 25) * 60));

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
