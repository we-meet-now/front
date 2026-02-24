export type CreateMeetingForm = {
  // Step1
  timeType?: 'date' | 'custom';
  date?: string;
  time?: string;

  // Step2
  meetingTypeMode?: 'preset' | 'custom';
  meetingType?: string;

  // Step3
  placeMode?: 'vote' | 'search' | 'ai';
  place?: string; // ⭐ 추가 (search/ai 결과 저장용)
};

export type FunnelStep = 'time' | 'type' | 'place';
