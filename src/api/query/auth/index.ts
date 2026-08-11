import { useMutation, useQuery } from '@tanstack/react-query';

import { type EmailApiResponse, sendEmailCode, verifyEmailCode } from '@/api/auth/email';
import {
  getUserInfo,
  type JoinRequest,
  type JoinResponse,
  joinUser,
  type LoginRequest,
  type LoginResponse,
  loginUser,
} from '@/api/auth/user';
import { isLogin } from '@/utils/isLogin';

export const useJoinMutation = () => {
  return useMutation<JoinResponse, Error, Omit<JoinRequest, 'role'>>({
    mutationFn: joinUser,
  });
};

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
  });
};

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!isLogin(),
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
