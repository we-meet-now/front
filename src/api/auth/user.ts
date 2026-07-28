import { apiClient } from '../client';
import { AUTH_URL } from '../config';

export type JoinRequest = {
  email: string;
  password: string;
  passwordCorrect: string;
  nickname: string;
  username: string;
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
