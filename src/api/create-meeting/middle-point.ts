import { ApiError, apiClient } from '../client';
import { AI_URL } from '../config';

/** 모임 목적. 미지정 시 서버 기본값은 지하철역(SW8)이다. */
export type MeetingType = '맛집' | '카페' | '문화' | '관광' | '숙박' | '마트' | '지하철';

export type UserStartInfo = {
  user_seq: string;
  user_nickname: string;
  /** 도로명 주소·지하철역명·건물명 모두 가능 (서버에서 Kakao 키워드 검색으로 좌표화) */
  user_start_addr: string;
};

export type MiddlePointRequest = {
  /** 최소 2명. 순서가 travel_times 인덱스와 대응된다. */
  user_start_infos: UserStartInfo[];
  meeting_type: MeetingType;
};

export type StationScore = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance_m: number;
  /** Kakao 장소 페이지 URL */
  url: string;
  /** user_start_infos 순서와 동일. -1은 경로 조회 실패 */
  travel_times: number[];
  /** true면 ODsay 실패로 직선거리 기반 추정값 */
  estimated_mask?: boolean[];
  /** 경로 조회 전체 실패 시 null */
  max_time: number | null;
  avg_time: number | null;
};

export type UserCoordInfo = {
  user_seq: string;
  user_nickname: string;
  lat: number;
  lng: number;
  /** 예: '1시간 20분', '조회 불가' */
  travel_time_label?: string | null;
};

export type MiddlePointResponse = {
  middle_lat: number;
  middle_lng: number;
  recommended_station: StationScore;
  /** max_time 오름차순 후보 목록 */
  candidates: StationScore[];
  user_coords: UserCoordInfo[];
  warnings?: string[];
};

export const MIN_DEPARTURES = 2;

/**
 * 400: 출발지 2개 미만이거나 주소를 찾을 수 없음
 * 404: 중간 지점 반경 내 장소 없음 (버스터미널 폴백까지 실패)
 * 503: 서버 측 외부 API 키 미설정
 */
export const fetchMiddlePoint = (body: MiddlePointRequest): Promise<MiddlePointResponse> =>
  apiClient<MiddlePointResponse>('/recommend/middle-point', {
    method: 'POST',
    body,
    baseUrl: AI_URL,
  });

/** 화면에 그대로 노출할 수 있는 실패 안내 문구로 변환한다. */
export const describeMiddlePointError = (error: unknown) => {
  if (!(error instanceof ApiError)) {
    return { title: '중간위치를 찾지 못했어요', description: '잠시 후 다시 시도해 주세요' };
  }

  switch (error.status) {
    case 400:
      return {
        title: '출발지를 확인해 주세요',
        description: '주소를 찾을 수 없거나 출발지가 2곳보다 적어요',
      };
    case 404:
      return {
        title: '주변에서 만날 곳을 찾지 못했어요',
        description: '출발지를 조금 바꿔서 다시 시도해 주세요',
      };
    case 422:
      return { title: '입력값을 확인해 주세요', description: '출발지 형식이 올바르지 않아요' };
    case 503:
      return { title: '지금은 추천할 수 없어요', description: '잠시 후 다시 시도해 주세요' };
    default:
      return { title: '중간위치를 찾지 못했어요', description: '잠시 후 다시 시도해 주세요' };
  }
};
