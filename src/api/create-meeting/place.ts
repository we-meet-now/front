import { ApiError, apiClient } from '../client';
import { AI_URL, API_MODE } from '../config';

/** 서버 스키마상 모두 필수다. 미정인 값은 빈 문자열로 보낸다 */
export type PlaceSearchRequest = {
  date: string;
  time: string;
  meetingType: string;
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

/** 입력값·요청 형식 문제(4xx)는 다시 보내도 같은 결과라 재시도하지 않는다 */
export const shouldRetryPlaceSearch = (failureCount: number, error: unknown) => {
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false;
  return failureCount < 2;
};

/** 화면에 그대로 노출할 수 있는 실패 안내 문구로 변환한다. */
export const describePlaceSearchError = (error: unknown) => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
      case 422:
        return {
          title: '검색 조건을 확인해 주세요',
          description: '지역 이름을 다르게 입력해서 다시 검색해 주세요',
        };
      case 404:
        return {
          title: '추천할 장소를 찾지 못했어요',
          description: '근처 역이나 동네 이름으로 다시 검색해 주세요',
        };
      case 503:
        return { title: '지금은 추천할 수 없어요', description: '잠시 후 다시 시도해 주세요' };
    }
  }
  return { title: '장소를 추천받지 못했어요', description: '잠시 후 다시 시도해 주세요' };
};
