import { apiClient } from '../client';
import { AUTH_URL } from '../config';

export type EmailApiResponse = {
  statusCode: string;
  data: unknown;
  message: string;
};

export const sendEmailCode = (email: string): Promise<EmailApiResponse> =>
  apiClient('/email/send', {
    method: 'POST',
    baseUrl: AUTH_URL,
    body: { email },
  });

export const verifyEmailCode = (email: string, code: string): Promise<EmailApiResponse> =>
  apiClient('/email/verify', {
    method: 'POST',
    baseUrl: AUTH_URL,
    body: { email, code },
  });
