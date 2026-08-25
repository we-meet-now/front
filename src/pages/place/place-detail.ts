import type { PlaceSearchType } from '@/api/create-meeting/place';

export type PlaceDetail = PlaceSearchType &
  Required<
    Pick<PlaceSearchType, 'category' | 'stationExit' | 'walkingMinutes' | 'rating' | 'reviewCount'>
  >;

/** FNV-1a — 같은 장소면 항상 같은 값이 나오므로 재렌더에도 평점이 흔들리지 않는다. */
const hash = (value: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/**
 * 서버가 아직 주지 않는 카드 정보를 장소별로 결정적으로 채운다.
 * 실제 값이 오면 그쪽이 항상 우선한다.
 */
export const enrichPlace = (
  place: PlaceSearchType,
  ctx: { category: string; station: string },
): PlaceDetail => {
  const seed = hash(`${place.id}|${place.name}`);

  return {
    ...place,
    category: place.category ?? ctx.category,
    stationExit: place.stationExit ?? `${ctx.station} ${1 + ((seed >>> 11) % 8)}번 출구`,
    walkingMinutes: place.walkingMinutes ?? 1 + ((seed >>> 7) % 12),
    rating: place.rating ?? (40 + (seed % 10)) / 10,
    reviewCount: place.reviewCount ?? 30 + ((seed >>> 3) % 970),
  };
};

export const buildNaverMapUrl = (place: PlaceSearchType) =>
  `https://map.naver.com/p/search/${encodeURIComponent(`${place.name} ${place.address}`)}`;
