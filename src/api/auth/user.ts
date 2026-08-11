import { apiClient } from '../client';
import { AUTH_URL } from '../config';

export type JoinRequest = {
  email?: string;
  password?: string;
  passwordCorrect?: string;
  nickname?: string;
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

export const getUserInfo = (): Promise<UserInfoResponse> =>
  apiClient('/users/get-user-info', {
    baseUrl: AUTH_URL,
    auth: true,
  });
