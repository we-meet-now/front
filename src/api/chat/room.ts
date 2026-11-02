import { apiClient } from '../client';
import { CHAT_URL } from '../config';

export type CreateChatRoomRequest = {
  chatRoomNm: string;
  invitedUserIdList: number[];
};

export type CreateChatRoomResponse = {
  statusCode: string;
  data: {
    chatRoomId: number;
    enterCode: string;
  };
  message: string;
};

/** 방장 회원 토큰으로만 호출한다. 참가자는 초대 링크(enterCode)로 이후에 들어온다 */
export const createChatRoom = (body: CreateChatRoomRequest): Promise<CreateChatRoomResponse> =>
  apiClient('/chat-rooms/create', {
    method: 'POST',
    baseUrl: CHAT_URL,
    body,
    auth: true,
  });

export type EnterRoomRequest = {
  roomId: number;
};

export type ChatHistoryItem = {
  chatId: number;
  chatRoomId: number;
  userId: number | null;
  uuId?: string | null;
  /** 서버가 확인한 보낸 사람 이름 */
  username?: string | null;
  message: string;
  chatType: 'CHAT' | 'ENTER' | 'LEAVE';
  inpDate: string;
};

export type EnterRoomResponse = {
  uuId: string;
  statusCode: string;
  statusMsg: string;
  markedReadCount: number;
  guestToken: string;
  isRefreshed: string;
  loginedUserId: number;
  /** 대화 내역이 없으면(게스트 첫 입장 등) null로 온다 */
  chatList: ChatHistoryItem[] | null;
};

/** 회원·게스트 모두 Authorization 토큰으로 식별된다 */
export const enterRoom = (body: EnterRoomRequest): Promise<EnterRoomResponse> =>
  apiClient('/chat-rooms/enter-room', {
    method: 'POST',
    baseUrl: CHAT_URL,
    body,
    auth: true,
  });
