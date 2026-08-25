import { apiClient } from '../client';
import { AI_URL, API_MODE } from '../config';

export type PlaceSearchRequest = {
  date?: string;
  time?: string;
  meetingType?: string;
  loc: string;
};

export type PlaceSearchResponse = PlaceSearchType[];

export type PlaceSearchType = {
  id: string;
  name: string;
  address: string;
  comment: string;
  // 아직 서버가 내려주지 않는 값들. 화면에서는 없으면 mock으로 채우고,
  // 서버가 주기 시작하면 별도 수정 없이 실데이터가 우선한다.
  category?: string;
  stationExit?: string;
  walkingMinutes?: number;
  rating?: number;
  reviewCount?: number;
};

const mock: PlaceSearchResponse = [
  {
    id: 'place1',
    name: '강남 와인바',
    address: '서울 강남구 테헤란로 123',
    comment: '접근성 우수',
  },
  {
    id: 'place2',
    name: '강남 브런치 카페',
    address: '서울 강남구 역삼로 456',
    comment: '맛집',
  },
];

export const fetchSearchPlaces = async (body: PlaceSearchRequest): Promise<PlaceSearchResponse> => {
  if (API_MODE === 'local') {
    await new Promise((r) => setTimeout(r, 500));
    return mock;
  }

  return apiClient('/recommend/meeting-places', {
    method: 'POST',
    body,
    baseUrl: AI_URL,
  });
};
