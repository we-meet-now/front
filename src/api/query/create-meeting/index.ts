import { useQuery } from '@tanstack/react-query';

import { type RecommendResponse, fetchRecommendTypes } from '@/api/create-meeting/meeting';
import {
  MIN_DEPARTURES,
  type MiddlePointRequest,
  type MiddlePointResponse,
  fetchMiddlePoint,
} from '@/api/create-meeting/middle-point';
import { type PlaceSearchResponse, fetchSearchPlaces } from '@/api/create-meeting/place';

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
    queryFn: () => fetchSearchPlaces({ date, time, meetingType, loc: loc ?? '' }),
    enabled: !!loc,
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
