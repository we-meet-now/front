import type { MeetingType } from '@/pages/create-meeting/steps/TypeStep';

import { apiClient } from '../client';
import { API_MODE } from '../config';

export type RecommendRequest = {
  date?: string | null;
  time?: string | null;
};
export type RecommendResponse = {
  recommendations: MeetingType[];
};

const mock = {
  recommendations: [
    { label: '와인 파티', desc: '우아한 테이스팅', emoji: '🍷' },
    { label: '노래방 모임', desc: '신나게 노래 불러요', emoji: '🎤' },
    { label: '볼링 한판', desc: '스트라이크의 쾌감', emoji: '🎳' },
    { label: '독서 모임', desc: '책과 함께', emoji: '📚' },
  ],
};

export const fetchRecommendTypes = async (body: RecommendRequest): Promise<RecommendResponse> => {
  if (API_MODE === 'local') {
    await new Promise((r) => setTimeout(r, 500));
    return mock;
  }

  return apiClient('/meeting/recommend-types', {
    method: 'POST',
    body,
  });
};
