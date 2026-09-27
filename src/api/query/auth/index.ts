import { useMutation, useQuery } from '@tanstack/react-query';

import { type EmailApiResponse, sendEmailCode, verifyEmailCode } from '@/api/auth/email';
import {
  type JoinRequest,
  type JoinResponse,
  type LoginRequest,
  type LoginResponse,
  getRandomNickname,
  getUserInfo,
  joinUser,
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

/**
 * API는 호출당 닉네임 1개를 주므로 count만큼 병렬 호출한다.
 * 같은 값이 겹칠 수 있어 중복은 제거한다.
 */
export const useRandomNicknames = (count: number) => {
  return useQuery({
    queryKey: ['randomNicknames', count],
    queryFn: async () => {
      const responses = await Promise.all(Array.from({ length: count }, getRandomNickname));
      return [...new Set(responses.map(({ data }) => data.nickname))];
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
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
