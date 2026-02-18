import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { useMessages } from '@/shared/api/messages/use-messages';
import type { MessageResponse, UiMessage } from '@/shared/api/messages/messages.types';
import { ChatBottom } from '@/features/chat/ui/bottom/ChatBottom';
import { ChatTop } from '@/features/chat/ui/top/ChatTop';

import { ChatMiddle } from '@/features/chat/ui/middle/ChatMiddle';
import { getCookie, getWsUrl } from '@/features/chat/model/chat.api';
import { useMe } from '@/features/auth/auth';
import { useChatStore } from '@/features/chat/model/chat.store';

export const ChatPage = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const wsUrl = getWsUrl();
  const token = getCookie('vago_token');

  const { data: me } = useMe();
  const { data: serverMessages } = useMessages();
  const liveMessages = useChatStore((s) => s.liveMessages);
  const addLiveMessage = useChatStore((s) => s.addLiveMessage);

  const messages = useMemo((): UiMessage[] => {
    const myId = me?.id;
    const map = new Map<number, MessageResponse>();

    for (const m of serverMessages) {
      map.set(m.id, m);
    }

    for (const m of liveMessages) {
      if (!map.has(m.id)) {
        map.set(m.id, m);
      }
    }

    return Array.from(map.values()).map((m) => ({ ...m, isMine: myId === m.authorId }));
  }, [me?.id, serverMessages, liveMessages]);

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
        addLiveMessage(dto);

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
  }, [addLiveMessage, token, wsUrl]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <ChatTop wsUrl={wsUrl} isConnected={isConnected} />
          <ChatMiddle
            messages={messages}
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
