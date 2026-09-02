import type { UserStartInfo } from '@/api/create-meeting/middle-point';
import type { PlaceSearchType } from '@/api/create-meeting/place';

/**
 * 비로그인 모임장소 플로우는 단계 간 데이터를 sessionStorage로 넘긴다.
 * 손상된 값이 들어와도 화면이 깨지지 않도록 읽기/쓰기를 여기로 모은다.
 */
export const GUEST_KEYS = {
  directPoints: 'guest_direct_points',
  startInfos: 'guest_start_infos',
  midpoint: 'guest_midpoint',
  selectedPlaces: 'guest_selected_places',
} as const;

export type DeparturePoint = {
  id: string;
  address: string;
  placeName?: string;
  lat?: number;
  lng?: number;
};

const readArray = <T>(key: string): T[] => {
  const raw = sessionStorage.getItem(key);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
};

export const loadDeparturePoints = () => readArray<DeparturePoint>(GUEST_KEYS.directPoints);

export const saveDeparturePoints = (points: DeparturePoint[]) =>
  sessionStorage.setItem(GUEST_KEYS.directPoints, JSON.stringify(points));

/**
 * 중간위치·장소추천 API가 그대로 쓰는 참여자 목록.
 * 직접 입력 플로우와 링크 공유 플로우가 출발지를 모으는 방식이 달라
 * 각 화면이 요청 형태로 변환한 결과를 여기에 저장해 다음 단계로 넘긴다.
 */
export const loadStartInfos = () => readArray<UserStartInfo>(GUEST_KEYS.startInfos);

export const saveStartInfos = (infos: UserStartInfo[]) =>
  sessionStorage.setItem(GUEST_KEYS.startInfos, JSON.stringify(infos));

export const loadMidpoint = () => sessionStorage.getItem(GUEST_KEYS.midpoint) ?? '';

export const saveMidpoint = (midpoint: string) =>
  sessionStorage.setItem(GUEST_KEYS.midpoint, midpoint);

export const loadSelectedPlaces = () => readArray<PlaceSearchType>(GUEST_KEYS.selectedPlaces);

export const saveSelectedPlaces = (places: PlaceSearchType[]) =>
  sessionStorage.setItem(GUEST_KEYS.selectedPlaces, JSON.stringify(places));
