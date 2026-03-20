import { useQuery } from '@tanstack/react-query';

import { type RecommendResponse, fetchRecommendTypes } from '@/api/create-meeting/meeting';
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
