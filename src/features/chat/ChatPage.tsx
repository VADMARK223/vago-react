import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { useMessages } from '@/shared/api/messages/use-messages';
import type { MessageResponse } from '@/shared/api/messages/messages.types';
import { ChatBottom } from '@/features/chat/bottom/ChatBottom';
import { ChatTop } from '@/features/chat/top/ChatTop';

import { ChatMiddle } from '@/features/chat/middle/ChatMiddle';
import { getCookie, WS_URL } from '@/features/chat/chat';

export const ChatPage = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const token = useMemo(() => getCookie('vago_token'), []);

  const { data: serverMessages } = useMessages();
  const [pending, setPending] = useState<MessageResponse[]>([]);
  const messages = [...serverMessages, ...pending];
  /*const messages = useMemo(() => {
    const map = new Map<string, MessageResponse>();
    for (const m of serverMessages ?? []) map.set(m.id, m);
    for (const m of pending) map.set(m.id, m);
    return Array.from(map.values());
  }, [serverMessages, pending]);*/

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = `${WS_URL}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onmessage = (event) => {
      try {
        const dto = JSON.parse(event.data);
        setPending((prev) => [...prev, dto]);
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
  }, [token]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <ChatTop isConnected={isConnected} />
          <ChatMiddle messages={messages} />
          <ChatBottom isConnected={isConnected} wsRef={wsRef} />
        </div>
      </div>
    </>
  );
};
