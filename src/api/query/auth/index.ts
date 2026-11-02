import { useMutation, useQuery } from '@tanstack/react-query';

import { type EmailApiResponse, sendEmailCode, verifyEmailCode } from '@/api/auth/email';
import {
  type GuestTokenResponse,
  type JoinRequest,
  type JoinResponse,
  type LoginRequest,
  type LoginResponse,
  getGuestToken,
  getRandomNickname,
  getUserInfo,
  joinUser,
  loginUser,
  setUsername,
} from '@/api/auth/user';
import { getStoredGuestUsername, isLogin, saveGuestUsername } from '@/utils/isLogin';

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

export const useGuestTokenMutation = () => {
  return useMutation<GuestTokenResponse, Error, void>({
    mutationFn: getGuestToken,
  });
};

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!isLogin(),
  });
};

const SET_USERNAME_MAX_ATTEMPTS = 3;

/**
 * 게스트 이름: 랜덤 이름을 받아 set-username으로 서버에 등록하고, 등록에 성공한 이름만 저장한다.
 * 저장된 이름이 있으면 이미 등록된 게스트이므로 다시 호출하지 않는다.
 * set-username은 게스트 토큰으로 사용자를 찾으므로 enter-room으로 토큰을 받은 뒤(enabled)에 호출한다.
 * 회원은 username을 쓰므로 호출하지 않는다.
 */
export const useGuestUsernameQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['guestUsername'],
    queryFn: async () => {
      const stored = getStoredGuestUsername();
      if (stored) return stored;

      // 이미 쓰는 이름이면 등록이 실패하므로 새 랜덤 이름으로 몇 번 다시 시도한다
      let lastError: unknown;
      for (let attempt = 0; attempt < SET_USERNAME_MAX_ATTEMPTS; attempt++) {
        const { data } = await getRandomNickname();
        try {
          await setUsername(data.nickname);
          saveGuestUsername(data.nickname);
          return data.nickname;
        } catch (error) {
          lastError = error;
        }
      }
      throw lastError;
    },
    enabled: enabled && !isLogin(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
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
