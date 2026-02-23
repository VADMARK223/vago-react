import { type RefObject, useEffect, useRef, useState } from 'react';
import { type QueryClient } from '@tanstack/react-query';
import { type MessageInstance } from 'antd/es/message/interface';
import { QUERY_KEY } from '@/shared/constants';
import { type ChatOutbound, isOutboundEnvelope } from '@/features/chat/model/chat.ws.protocol';
import { type MessagesQueryData } from '@/shared/api/messages/messages.types';
import { type OnlineUser } from '@/features/chat/model/chat.store';

type Params = {
  wsUrl: string;
  token: string;
  qc: QueryClient;
  messageApi: MessageInstance;

  atBottomRef: RefObject<boolean>;
  incUnread: () => void;

  setSnapshot: (users: OnlineUser[]) => void;
  userJoined: (payload: OnlineUser) => void;
  userLeft: (userId: number) => void;
};

export function useChatWs({
  wsUrl,
  token,
  qc,
  messageApi,
  atBottomRef,
  incUnread,
  setSnapshot,
  userJoined,
  userLeft,
}: Params) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrlWithToken = `${wsUrl}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrlWithToken);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);

    const assertNever = (x: never): never => {
      throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
    };

    ws.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data) as ChatOutbound;

        if (!isOutboundEnvelope(raw)) {
          console.warn('Invalid WS message envelope', raw);
          return;
        }

        switch (raw.type) {
          case 'message.new': {
            const dto = raw.payload;

            qc.setQueryData(
              [QUERY_KEY.messages],
              (prev: MessagesQueryData | undefined): MessagesQueryData => {
                const messages = prev?.messages ?? [];
                if (messages.length > 0 && messages[messages.length - 1]?.id === dto.id) {
                  return { messages };
                }
                return { messages: [...messages, dto] };
              },
            );

            if (!atBottomRef.current) {
              incUnread();
            }
            break;
          }

          case 'users.snapshot':
            setSnapshot(raw.payload.users);
            break;

          case 'user.joined':
            messageApi.info(`Новый пользователь: ${raw.payload.username}`).then();
            userJoined(raw.payload);
            break;

          case 'user.left':
            messageApi.info(`Пользователь: ${raw.payload.userId} покинул чат.`).then();
            userLeft(raw.payload.userId);
            break;

          case 'error':
            console.error('WS error:', raw.payload.message);
            break;

          default:
            assertNever(raw); // Компилятор заставит обработать все кейсы
        }
      } catch (e) {
        console.error('Could not parse WS message', e);
      }
    };

    ws.onclose = () => setIsConnected(false);
    ws.onerror = () => setIsConnected(false);

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [wsUrl, token, qc, messageApi, atBottomRef, incUnread, setSnapshot, userJoined, userLeft]);

  return { wsRef, isConnected };
}
