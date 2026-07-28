import { useMutation } from '@tanstack/react-query';

import { type EmailApiResponse, sendEmailCode, verifyEmailCode } from '@/api/auth/email';
import { type JoinRequest, type JoinResponse, joinUser } from '@/api/auth/user';

export const useJoinMutation = () => {
  return useMutation<JoinResponse, Error, Omit<JoinRequest, 'role'>>({
    mutationFn: joinUser,
  });
};

export const useSendEmailMutation = () => {
  return useMutation<EmailApiResponse, Error, string>({
    mutationFn: sendEmailCode,
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation<EmailApiResponse, Error, { email: string; code: string }>({
    mutationFn: ({ email, code }) => verifyEmailCode(email, code),
  });
};
