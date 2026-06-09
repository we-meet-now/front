import { useCallback, useEffect, useRef, useState } from 'react';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { WS_URL } from '@/api/config';

export type StompMessageType = 'CHAT' | 'ENTER' | 'LEAVE';

export type StompMessage = {
  userId: string | number;
  message?: string;
  chatType: StompMessageType;
  chatRoomId?: string | number;
};

type UseStompChatOptions = {
  roomId: string;
  username: string;
};

export const useStompChat = ({ roomId, username }: UseStompChatOptions) => {
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
        destination: '/app/chat.sendMessage',
        body: JSON.stringify({
          chatRoomId: roomId,
          userId: username,
          message: content,
          chatType: 'CHAT',
        } satisfies StompMessage),
      });
    },
    [username, roomId],
  );

  const disconnect = useCallback(() => {
    const client = clientRef.current;
    if (!client?.connected) return;

    client.publish({
      destination: '/app/chat.addUser',
      body: JSON.stringify({
        chatRoomId: roomId,
        userId: username,
        message: '',
        chatType: 'LEAVE',
      } satisfies StompMessage),
    });
    client.deactivate();
  }, [username, roomId]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 3000,
      debug: (str) => console.debug('[STOMP]', str),
      onConnect: () => {
        console.log('[STOMP] 연결 성공 — room:', roomId);
        setIsConnected(true);

        client.subscribe(`/topic/public`, (frame) => {
          try {
            const msg: StompMessage = JSON.parse(frame.body);
            console.log('[STOMP] 수신:', msg);
            addMessage(msg);
          } catch {
            // 파싱 실패한 메시지는 무시
          }
        });

        client.publish({
          destination: '/app/chat.addUser',
          body: JSON.stringify({
            chatRoomId: roomId,
            userId: username,
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
  }, [username, roomId, addMessage]);

  return { messages, isConnected, sendMessage, disconnect };
};
