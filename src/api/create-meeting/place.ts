import { apiClient } from '../client';
import { API_MODE } from '../config';

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

  return apiClient('/recommend/search', {
    method: 'POST',
    body,
  });
};
