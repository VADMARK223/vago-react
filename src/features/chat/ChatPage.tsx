import { useEffect, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { useMessages } from '@/shared/api/messages/use-messages';
import type { MessageResponse } from '@/shared/api/messages/messages.types';
import { ChatBottom } from '@/features/chat/ui/bottom/ChatBottom';
import { ChatTop } from '@/features/chat/ui/top/ChatTop';

import { ChatMiddle } from '@/features/chat/ui/middle/ChatMiddle';
import { getCookie, getWsUrl } from '@/features/chat/model/chat.api';
import { useMe } from '@/features/auth/auth';
import { QUERY_KEY } from '@/shared/constants';
import { useQueryClient } from '@tanstack/react-query';

type Temp = {
  messages: MessageResponse[];
};

export const ChatPage = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const wsUrl = getWsUrl();
  const token = getCookie('vago_token');

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
        const dto = JSON.parse(event.data) as MessageResponse;

        qc.setQueryData([QUERY_KEY.messages], (prev: Temp): Temp => {
          return { messages: [...prev.messages, dto] };
        });

        if (!atBottomRef.current) {
          setUnread((n) => n + 1);
        }
      } catch (e) {
        console.error('Could not parse message', e);
      }
    };

    ws.onclose = () => setIsConnected(false);
    ws.onerror = () => setIsConnected(false);

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [qc, token, wsUrl]);

  const uiMessages = messages.map((m) => {
    return { ...m, isMine: myId === m.authorId };
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <ChatTop wsUrl={wsUrl} isConnected={isConnected} />
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
