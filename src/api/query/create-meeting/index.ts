import { useQuery } from '@tanstack/react-query';

import { type RecommendResponse, fetchRecommendTypes } from '@/api/create-meeting/meeting';

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
