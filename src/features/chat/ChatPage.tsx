import { useEffect, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { useMessages } from '@/shared/api/messages/use-messages';
import { ChatBottom } from '@/features/chat/ui/bottom/ChatBottom';
import { ChatTop } from '@/features/chat/ui/top/ChatTop';

import { ChatMiddle } from '@/features/chat/ui/middle/ChatMiddle';
import {
  type ChatOutbound,
  getCookie,
  getWsUrl,
  isOutboundEnvelope,
} from '@/features/chat/model/chat.ws.protocol';
import { useMe } from '@/features/auth/auth';
import { QUERY_KEY } from '@/shared/constants';
import { useQueryClient } from '@tanstack/react-query';
import { type MessagesQueryData } from '@/shared/api/messages/messages.types';
import { App } from 'antd';
import { useChatStore } from '@/features/chat/model/chat.store';

export const ChatPage = () => {
  const { message } = App.useApp();
  const wsRef = useRef<WebSocket | null>(null);
  const wsUrl = getWsUrl();
  const token = getCookie('vago_token');

  const setSnapshot = useChatStore((s) => s.setSnapshot);
  const userCount = useChatStore((s) => s.onlineUsers.length);
  const userJoined = useChatStore((s) => s.userJoined);
  const userLeft = useChatStore((s) => s.userLeft);

  const qc = useQueryClient();
  const { data: me } = useMe();
  const myId = me?.id;
  const { data: messages } = useMessages();
  const [isConnected, setIsConnected] = useState(false);

  const atBottomRef = useRef(true);
  const [atBottom, setAtBottom] = useState(true);
  const [unread, setUnread] = useState(0);

  const handleBottomChange = (val: boolean) => {
    atBottomRef.current = val;
    setAtBottom(val);

    if (val) {
      setUnread(0);
    }
  };

  useEffect(() => {
    const wsUrlWithToken = `${wsUrl}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrlWithToken);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);

    ws.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data) as ChatOutbound; // TODO: прикрутить ZOD

        if (!isOutboundEnvelope(raw)) {
          console.warn('Invalid WS message envelope', raw);
          return;
        }

        const msg = raw;

        switch (msg.type) {
          case 'message.new': {
            const dto = msg.payload;

            qc.setQueryData(
              [QUERY_KEY.messages],
              (prev: MessagesQueryData | undefined): MessagesQueryData => {
                const messages = prev?.messages ?? [];

                // минимальная защита от дублей
                if (messages.length > 0 && messages[messages.length - 1]?.id === dto.id) {
                  return { messages };
                }

                return { messages: [...messages, dto] };
              },
            );

            if (!atBottomRef.current) {
              setUnread((n) => n + 1);
            }
            break;
          }

          case 'users.snapshot': {
            console.log('Список пользователей:', msg.payload.users);
            setSnapshot(msg.payload.users);
            break;
          }

          case 'user.joined': {
            console.log(`Новый пользователь: ${msg.payload.username}`);
            message.info(`Новый пользователь: ${msg.payload.username}`).then();
            userJoined(msg.payload);
            break;
          }

          case 'user.left': {
            console.log('User left chat', msg.payload);
            message.info(`Пользователь: ${msg.payload.userId} покинул чат.`).then();
            userLeft(msg.payload.userId);
            break;
          }

          case 'error': {
            console.error('WS error:', msg.payload.message);
            break;
          }

          default:
            console.warn('Unknown WS message type!'); //, msg.type);
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
  }, [message, qc, setSnapshot, token, userJoined, userLeft, wsUrl]);

  const uiMessages = messages.map((m) => {
    return { ...m, isMine: myId === m.authorId };
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <ChatTop wsUrl={wsUrl} userCount={userCount + 1} isConnected={isConnected} />
          <ChatMiddle
            messages={uiMessages}
            atBottom={atBottom}
            unread={unread}
            onAtBottomChange={handleBottomChange}
          />
          <ChatBottom isConnected={isConnected} wsRef={wsRef} />
        </div>
      </div>
    </>
  );
};
