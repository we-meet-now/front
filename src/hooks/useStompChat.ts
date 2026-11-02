import { useCallback, useEffect, useRef, useState } from 'react';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { WS_URL } from '@/api/config';
import { getAuthToken } from '@/utils/isLogin';

export type StompMessageType = 'CHAT' | 'ENTER' | 'LEAVE';

export type StompMessage = {
  /** 회원은 토큰의 사용자 ID, 게스트는 null. 서버가 토큰의 사용자와 일치하는지 검사한다 */
  userId: number | null;
  message?: string;
  chatType: StompMessageType;
  chatRoomId?: number;
  /** 게스트 식별용. 회원은 보내지 않는다 */
  uuId?: string | null;
  /** 서버가 내려주는 보낸 사람 이름 (보낼 때는 넣지 않는다) */
  username?: string | null;
};

type UseStompChatOptions = {
  roomId: number;
  userId: number | null;
  /** 게스트면 게스트 uuId를 넘긴다 */
  uuId?: string;
  /** 입장 API로 내 userId를 받기 전에는 연결하지 않는다 */
  enabled?: boolean;
};

export const useStompChat = ({ roomId, userId, uuId, enabled = true }: UseStompChatOptions) => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<StompMessage[]>([]);

  const addMessage = useCallback((msg: StompMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      if (!clientRef.current?.connected || !content.trim()) return;

      clientRef.current.publish({
        destination: '/api/chat/v1/message/app/chat.sendMessage',
        body: JSON.stringify({
          chatRoomId: roomId,
          userId,
          uuId,
          message: content,
          chatType: 'CHAT',
        } satisfies StompMessage),
      });
    },
    [userId, uuId, roomId],
  );

  const disconnect = useCallback(() => {
    const client = clientRef.current;
    if (!client?.connected) return;

    client.publish({
      destination: '/api/chat/v1/message/app/chat.addUser',
      body: JSON.stringify({
        chatRoomId: roomId,
        userId,
        uuId,
        message: '',
        chatType: 'LEAVE',
      } satisfies StompMessage),
    });
    client.deactivate();
  }, [userId, uuId, roomId]);

  useEffect(() => {
    if (!enabled) return;

    if (!WS_URL) {
      console.error(
        '[STOMP] WS_URL이 비어 있어 연결을 시도하지 않습니다. VITE_WS_URL 설정을 확인하세요.',
      );
      setIsConnected(false);
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 3000,
      debug: (str) => console.debug('[STOMP]', str),
      // 서버는 연결 시 받은 토큰으로 사용자를 인증한다. 재연결 때도 최신 토큰을 쓰도록 매번 다시 읽는다
      beforeConnect: () => {
        const token = getAuthToken();
        client.connectHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      },
      onConnect: () => {
        console.log('[STOMP] 연결 성공 — room:', roomId);
        setIsConnected(true);
        // api/chat/v1/message 고정
        client.subscribe(`/api/chat/v1/message/topic/public`, (frame) => {
          try {
            const msg: StompMessage = JSON.parse(frame.body);
            console.log('[STOMP] 수신:', msg);
            // topic이 모든 방 공용이라 다른 방 메시지도 들어오므로 현재 방 것만 남긴다
            if (msg.chatRoomId != null && Number(msg.chatRoomId) !== roomId) return;
            addMessage(msg);
          } catch {
            // 파싱 실패한 메시지는 무시
            console.warn('[STOMP] 수신 메시지 파싱 실패:', frame.body);
          }
        });

        client.publish({
          destination: '/api/chat/v1/message/app/chat.addUser',
          body: JSON.stringify({
            chatRoomId: roomId,
            userId,
            uuId,
            message: '',
            chatType: 'ENTER',
          } satisfies StompMessage),
        });
      },
      onDisconnect: () => {
        console.warn('[STOMP] 연결 끊김');
        setIsConnected(false);
      },
      onWebSocketError: (event) => {
        console.error('[STOMP] WebSocket 오류:', event);
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error('[STOMP] STOMP 오류:', frame.headers['message'], frame.body);
        setIsConnected(false);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      // StrictMode 재마운트 포함, 항상 이 effect에서 생성한 client를 정리
      client.deactivate();
      setIsConnected(false);
    };
  }, [enabled, userId, uuId, roomId, addMessage]);

  return { messages, isConnected, sendMessage, disconnect };
};
