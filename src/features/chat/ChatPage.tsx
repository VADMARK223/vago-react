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

  const messages = useMemo((): MessageResponse[] => {
    const map = new Map<number, MessageResponse>();

    for (const m of serverMessages) {
      map.set(m.id, m);
    }

    for (const m of pending) {
      if (!map.has(m.id)) {
        map.set(m.id, m);
      }
    }

    return Array.from(map.values());
  }, [serverMessages, pending]);

  const removeFromPending = (id: number) => {
    setPending((p) => p.filter((m) => m.id !== id));
  };

  const clearPending = () => setPending([]);

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
    const wsUrl = `${WS_URL}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);

    ws.onmessage = (event) => {
      try {
        const dto = JSON.parse(event.data) as MessageResponse;
        setPending((prev) => [...prev, dto]);

        // ✅ unread считаем тут (внешняя система)
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
  }, [token]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <ChatTop isConnected={isConnected} clearPending={clearPending} />
          <ChatMiddle
            messages={messages}
            atBottom={atBottom}
            unread={unread}
            onAtBottomChange={handleBottomChange}
            removeFromPending={removeFromPending}
          />
          <ChatBottom isConnected={isConnected} wsRef={wsRef} />
        </div>
      </div>
    </>
  );
};
