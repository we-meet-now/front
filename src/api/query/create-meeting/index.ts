import { useQuery } from '@tanstack/react-query';

import { type RecommendResponse, fetchRecommendTypes } from '@/api/create-meeting/meeting';
import {
  MIN_DEPARTURES,
  type MiddlePointRequest,
  type MiddlePointResponse,
  fetchMiddlePoint,
} from '@/api/create-meeting/middle-point';
import {
  type PlaceSearchResponse,
  fetchSearchPlaces,
  shouldRetryPlaceSearch,
} from '@/api/create-meeting/place';

export const useRecommendTypes = (date?: string, time?: string) => {
  return useQuery<RecommendResponse>({
    queryKey: ['recommendTypes', date, time],
    queryFn: () =>
      fetchRecommendTypes({
        date: date ?? '',
        time: time ?? '',
      }),
    enabled: true,
  });
};

export const usePlaceSearch = (
  date?: string,
  time?: string,
  meetingType?: string,
  loc?: string,
) => {
  return useQuery<PlaceSearchResponse>({
    queryKey: ['placeSearch', date, time, meetingType, loc],
    // 서버(PlaceRequest)는 네 필드가 모두 필수 문자열이다. undefined는 JSON에서 키가 빠져 422가 나므로
    // 미정인 값은 빈 문자열로 보낸다 (meeting-types API와 같은 규칙)
    queryFn: () =>
      fetchSearchPlaces({
        date: date ?? '',
        time: time ?? '',
        meetingType: meetingType ?? '',
        loc: loc ?? '',
      }),
    enabled: !!loc,
    retry: shouldRetryPlaceSearch,
  });
};

/**
 * N명 중간 만남 장소 추천.
 * 출발지가 2곳 미만이면 서버가 400을 주므로 호출 자체를 막는다.
 * 외부 지도·경로 API를 여러 번 태우는 무거운 호출이라 자동 재시도는 끈다.
 */
export const useMiddlePoint = (request: MiddlePointRequest | null) => {
  return useQuery<MiddlePointResponse>({
    queryKey: ['middlePoint', request],
    queryFn: () => fetchMiddlePoint(request!),
    enabled: !!request && request.user_start_infos.length >= MIN_DEPARTURES,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
