export type CreateMeetingForm = {
  // Step1
  timeType?: 'date' | 'custom';
  date?: string;
  time?: string;

  // Step2
  meetingTypeMode?: 'preset' | 'custom';
  meetingType?: string;

  // Step3
  placeMode?: 'now' | 'vote' | 'search' | 'ai'; // ⭐ 추가
};

export type FunnelStep = 'time' | 'type' | 'place';
