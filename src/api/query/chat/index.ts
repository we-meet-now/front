import { useMutation, useQuery } from '@tanstack/react-query';

import {
  type CreateChatRoomRequest,
  type CreateChatRoomResponse,
  createChatRoom,
  enterRoom,
} from '@/api/chat/room';
import { isLogin, saveGuestToken } from '@/utils/isLogin';

export const useCreateChatRoomMutation = () => {
  return useMutation<CreateChatRoomResponse, Error, CreateChatRoomRequest>({
    mutationFn: createChatRoom,
  });
};

/**
 * 입장은 POST지만 방에 들어올 때 한 번만 호출해야 하므로 useQuery로 중복 호출을 막는다
 * (StrictMode 재마운트·리렌더에도 같은 roomId면 재요청하지 않음).
 */
export const useEnterRoomQuery = (roomId: number) => {
  return useQuery({
    queryKey: ['enterRoom', roomId],
    queryFn: async () => {
      const res = await enterRoom({ roomId });
      // 게스트는 첫 입장 응답으로 토큰을 발급받고, 재발급되면 다음 요청부터 새 토큰을 쓰도록 교체한다
      if (!isLogin() && res.guestToken && res.uuId) saveGuestToken(res.guestToken, res.uuId);
      return res;
    },
    enabled: Number.isInteger(roomId) && roomId > 0,
    staleTime: Infinity,
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
