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

export type ChatRoom = {
  chatRoomId: number;
  chatRoomNm: string;
  /** 모임 생성 시 받지 않는 값이라 비어 있을 수 있다 */
  placeId: number | null;
  meetType: string | null;
  meetTime: string | null;
  enterCode: string;
  inpDate: string;
  mdfyDate: string;
  inpUserId: string;
  mdfyUserId: string;
};

export type MyChatRoomItem = {
  chatRoom: ChatRoom;
  isNotReadCount: number;
};

/** 다른 채팅 API와 같이 { statusCode, data, message }로 감싸서 내려온다 */
export type MyChatRoomsResponse = {
  statusCode: string;
  data: {
    loginedUserId: number;
    /** 참여 중인 방이 없을 때 빈 배열 대신 null이 올 수 있어 화면에서 함께 처리한다 */
    chatRoomList: MyChatRoomItem[] | null;
  } | null;
  message: string;
};

/** 회원 토큰 기준으로 서버가 본인이 참여 중인 방만 내려준다 */
export const getMyChatRooms = (): Promise<MyChatRoomsResponse> =>
  apiClient('/chat-rooms', {
    baseUrl: CHAT_URL,
    auth: true,
  });

export type LeaveChatRoomResponse = {
  statusCode: string;
  data: unknown;
  message: string;
};

/**
 * 채팅방 퇴장. 서버 명세가 GET이고 경로에 `roomId=`가 문자 그대로 들어간다 (`leave-room/roomId=5`).
 * 실패를 HTTP 200 + statusCode로 내려줄 수도 있어 성공 코드(2xxx)가 아니면 오류로 본다.
 */
export const leaveChatRoom = async (roomId: number): Promise<LeaveChatRoomResponse> => {
  const res = await apiClient<LeaveChatRoomResponse>(
    `/chat-rooms/leave-room/roomId=${encodeURIComponent(roomId)}`,
    { baseUrl: CHAT_URL, auth: true },
  );
  if (res.statusCode && !res.statusCode.startsWith('2')) {
    throw new Error(res.message || '채팅방을 나가지 못했어요.');
  }
  return res;
};

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
