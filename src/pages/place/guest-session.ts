import type { PlaceSearchType } from '@/api/create-meeting/place';

/**
 * 비로그인 모임장소 플로우는 단계 간 데이터를 sessionStorage로 넘긴다.
 * 손상된 값이 들어와도 화면이 깨지지 않도록 읽기/쓰기를 여기로 모은다.
 */
export const GUEST_KEYS = {
  directPoints: 'guest_direct_points',
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

export const loadMidpoint = () => sessionStorage.getItem(GUEST_KEYS.midpoint) ?? '';

export const saveMidpoint = (midpoint: string) =>
  sessionStorage.setItem(GUEST_KEYS.midpoint, midpoint);

export const loadSelectedPlaces = () => readArray<PlaceSearchType>(GUEST_KEYS.selectedPlaces);

export const saveSelectedPlaces = (places: PlaceSearchType[]) =>
  sessionStorage.setItem(GUEST_KEYS.selectedPlaces, JSON.stringify(places));
