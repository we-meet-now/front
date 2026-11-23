import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  type CreateChatRoomRequest,
  type CreateChatRoomResponse,
  type LeaveChatRoomResponse,
  type MyChatRoomsResponse,
  createChatRoom,
  enterRoom,
  getMyChatRooms,
  leaveChatRoom,
} from '@/api/chat/room';
import { isLogin, saveGuestToken } from '@/utils/isLogin';

export const MY_CHAT_ROOMS_KEY = ['myChatRooms'] as const;

export const useCreateChatRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateChatRoomResponse, Error, CreateChatRoomRequest>({
    mutationFn: createChatRoom,
    // 홈으로 돌아왔을 때 새로 만든 모임이 바로 보이도록 목록을 다시 받는다
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MY_CHAT_ROOMS_KEY }),
  });
};

/**
 * 내 모임(채팅방) 목록. 회원 전용 API라 게스트 토큰으로는 호출하지 않는다.
 * 채팅방에서 돌아오면 다시 받아 읽지 않은 수를 갱신한다 (기본 staleTime 0).
 */
export const useMyChatRoomsQuery = () => {
  return useQuery({
    queryKey: MY_CHAT_ROOMS_KEY,
    queryFn: getMyChatRooms,
    select: (res) => res.data?.chatRoomList ?? [],
    enabled: !!isLogin(),
  });
};

/**
 * 채팅방 나가기. 성공하면 목록에서 바로 빼고(다시 받기 전 깜빡임 방지) 서버 목록으로 맞춘다.
 * 입장 캐시는 지우지 않는다: 채팅방 안에서 나가면 아직 마운트된 화면이 enter-room을 다시 부를 수 있고,
 * 입장 쿼리는 gcTime 0이라 화면을 벗어나면 저절로 정리된다.
 */
export const useLeaveChatRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<LeaveChatRoomResponse, Error, number>({
    mutationFn: leaveChatRoom,
    onSuccess: (_res, roomId) => {
      queryClient.setQueryData<MyChatRoomsResponse>(MY_CHAT_ROOMS_KEY, (old) =>
        old?.data
          ? {
              ...old,
              data: {
                ...old.data,
                chatRoomList: (old.data.chatRoomList ?? []).filter(
                  ({ chatRoom }) => chatRoom.chatRoomId !== roomId,
                ),
              },
            }
          : old,
      );
      return queryClient.invalidateQueries({ queryKey: MY_CHAT_ROOMS_KEY });
    },
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
