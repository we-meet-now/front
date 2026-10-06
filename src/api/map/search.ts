import {
  type KakaoAddress,
  type KakaoLatLngBounds,
  type KakaoPlace,
  loadKakao,
} from '@/utils/kakao';

/**
 * 홈 지도 이동용 검색 결과.
 * 출발지 검색(create-meeting/address)과 달리 지도를 옮겨야 하므로 좌표를 담는다.
 * 화면 이동에만 쓰고 저장하거나 다른 사람에게 보내지 않는다.
 */
export type MapSearchResult = {
  id: string;
  name: string;
  detail?: string;
  /** 업종 마지막 단계 ("육류,고기"). 주소 결과에는 없다. */
  category?: string;
  phone?: string;
  /** 카카오맵 장소 상세 URL (https로 정규화, 카카오 도메인만 허용) */
  placeUrl?: string;
  lat: number;
  lng: number;
};

/**
 * nearby: 현재 지도 화면 안에서 찾은 결과
 * all: 화면 안에 장소가 없어(또는 화면 정보 없이) 전국에서 찾은 결과
 */
export type MapSearchScope = 'nearby' | 'all';

export type MapSearchResponse = {
  results: MapSearchResult[];
  scope: MapSearchScope;
};

const MAX_RESULTS = 15;

/**
 * 외부 응답의 URL을 그대로 href에 넣으면 javascript: 같은 스킴이 섞일 수 있다.
 * 카카오맵 장소 페이지만 허용하고 https로 올린다.
 */
const toSafePlaceUrl = (url: string): string | undefined => {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return undefined;
    if (parsed.hostname !== 'place.map.kakao.com') return undefined;
    parsed.protocol = 'https:';
    return parsed.toString();
  } catch {
    return undefined;
  }
};

const fromPlace = (place: KakaoPlace): MapSearchResult => ({
  id: `place-${place.id}`,
  name: place.place_name,
  detail: place.road_address_name || place.address_name,
  category: place.category_name.split('>').pop()?.trim() || undefined,
  phone: place.phone || undefined,
  placeUrl: toSafePlaceUrl(place.place_url),
  lat: Number(place.y),
  lng: Number(place.x),
});

const fromAddress = (item: KakaoAddress): MapSearchResult => {
  const roadName = item.road_address?.address_name;
  const name = item.road_address?.building_name || roadName || item.address_name;
  return {
    id: `address-${item.address_name}`,
    name,
    // 도로명이 이름이 되면 지번 주소를, 건물명이 이름이 되면 도로명 주소를 함께 보여준다
    detail: [roadName, item.address?.address_name].find((value) => value && value !== name),
    lat: Number(item.y),
    lng: Number(item.x),
  };
};

const searchPlaces = async (keyword: string, bounds?: KakaoLatLngBounds) => {
  const kakao = await loadKakao();
  const { Places, Status } = kakao.maps.services;

  return new Promise<MapSearchResult[]>((resolve, reject) => {
    new Places().keywordSearch(
      keyword,
      (data, status) => {
        if (status === Status.OK) resolve(data.map(fromPlace));
        else if (status === Status.ZERO_RESULT) resolve([]);
        else reject(new Error('장소 검색 실패'));
      },
      { size: MAX_RESULTS, bounds },
    );
  });
};

const searchAddresses = async (keyword: string) => {
  const kakao = await loadKakao();
  const { Geocoder, Status } = kakao.maps.services;

  return new Promise<MapSearchResult[]>((resolve, reject) => {
    new Geocoder().addressSearch(keyword, (data, status) => {
      if (status === Status.OK) resolve(data.map(fromAddress));
      else if (status === Status.ZERO_RESULT) resolve([]);
      else reject(new Error('주소 검색 실패'));
    });
  });
};

/**
 * 화면 안의 장소를 먼저 찾고, 없으면 전국으로 넓힌다.
 * "카페"·"삼겹살"은 지금 보는 동네의 가게가, "강남역"처럼 화면 밖의 고유 장소는 전국 결과가 나온다.
 */
const searchPlacesNearFirst = async (
  keyword: string,
  bounds?: KakaoLatLngBounds,
): Promise<MapSearchResponse> => {
  if (bounds) {
    const nearby = await searchPlaces(keyword, bounds);
    if (nearby.length > 0) return { results: nearby, scope: 'nearby' };
  }
  return { results: await searchPlaces(keyword), scope: 'all' };
};

/**
 * 장소명·업종("카페", "삼겹살", "강남역")과 도로명·지번 주소("테헤란로 152", "역삼동 737")를 함께 검색한다.
 * bounds(현재 지도 화면)를 주면 장소는 그 안에서 먼저 찾는다. 주소는 위치와 무관하게 찾는다.
 * 결과가 없으면 빈 배열, SDK·네트워크 오류는 throw.
 */
export const searchMapLocations = async (
  keyword: string,
  bounds?: KakaoLatLngBounds,
): Promise<MapSearchResponse> => {
  const query = keyword.trim();
  if (!query) return { results: [], scope: 'all' };

  const [places, addresses] = await Promise.allSettled([
    searchPlacesNearFirst(query, bounds),
    searchAddresses(query),
  ]);

  // 둘 다 실패했을 때만 오류로 본다. 한쪽만 실패하면 나머지 결과라도 보여준다.
  if (places.status === 'rejected' && addresses.status === 'rejected') throw places.reason;

  const placeResponse = places.status === 'fulfilled' ? places.value : null;

  // 주소 검색은 주소처럼 입력했을 때만 결과가 나오므로, 나왔다면 의도에 더 가까워 먼저 둔다
  const results = [
    ...(addresses.status === 'fulfilled' ? addresses.value : []),
    ...(placeResponse?.results ?? []),
  ]
    .filter((result) => Number.isFinite(result.lat) && Number.isFinite(result.lng))
    .slice(0, MAX_RESULTS);

  // 주소만 나온 경우엔 "전국으로 넓혔다"는 안내가 의미 없으므로 nearby로 둔다
  return { results, scope: placeResponse?.results.length ? placeResponse.scope : 'nearby' };
};
