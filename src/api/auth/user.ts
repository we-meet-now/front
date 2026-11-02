import { apiClient } from '../client';
import { AUTH_URL } from '../config';

export type JoinRequest = {
  email?: string;
  password?: string;
  passwordCorrect?: string;
  username?: string;
  phoneNumber?: string;
  role: 'ROLE_USER';
};

export type JoinResponse = {
  statusCode: string;
  data: unknown;
  message: string;
};

export const joinUser = (body: Omit<JoinRequest, 'role'>): Promise<JoinResponse> =>
  apiClient('/users/join', {
    method: 'POST',
    baseUrl: AUTH_URL,
    body: { ...body, role: 'ROLE_USER' },
  });

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  statusCode: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
};

export const loginUser = (body: LoginRequest): Promise<LoginResponse> =>
  apiClient('/users/login', {
    method: 'POST',
    baseUrl: AUTH_URL,
    body,
  });

export type UserInfo = {
  userId: number;
  username: string | null;
  email: string;
  imgUrl: string;
  nickname: string;
  phoneNumber: string | null;
};

export type UserInfoResponse = {
  statusCode: string;
  data: UserInfo;
  message: string;
};

export type RandomNicknameResponse = {
  statusCode: string;
  data: {
    nickname: string;
  };
  message: string;
};

export const getRandomNickname = (): Promise<RandomNicknameResponse> =>
  apiClient('/users/create-random-username', {
    baseUrl: AUTH_URL,
  });

export type SetUsernameResponse = {
  statusCode: string;
  data: unknown;
  message: string;
};

/** 토큰으로 사용자를 찾아 username을 바꾼다 (게스트는 guestToken의 uuId 기준). 이미 쓰는 이름이면 실패한다 */
export const setUsername = (username: string): Promise<SetUsernameResponse> =>
  apiClient('/users/set-username', {
    method: 'POST',
    baseUrl: AUTH_URL,
    body: { username },
    auth: true,
  });

export const getUserInfo = (): Promise<UserInfoResponse> =>
  apiClient('/users/get-user-info', {
    baseUrl: AUTH_URL,
    auth: true,
  });

export type GuestTokenResponse = {
  statusCode: string;
  data: {
    uuId: string;
    guestToken: string;
  };
  message: string;
};

export const getGuestToken = (): Promise<GuestTokenResponse> =>
  apiClient('/users/no-login/get-guest-token', {
    baseUrl: AUTH_URL,
  });
