import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import clsx from 'clsx';
import { useMessages } from '@/shared/api/messages/use-messages';
import type { MessageResponse } from '@/shared/api/messages/messages.types';
import { ChatBottom } from '@/features/chat/ChatBottom';
import { MessageItem } from '@/features/chat/MessageItem';
import { AtBottomButton } from '@/features/chat/AtBottomButton';

const WS_URL = 'ws://localhost:5555/ws';

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : '';
}

export const ChatPage = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const token = useMemo(() => getCookie('vago_token'), []);

  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const { data: serverMessages } = useMessages();
  const [pending, setPending] = useState<MessageResponse[]>([]);
  const messages = [...serverMessages, ...pending];

  const [isConnected, setIsConnected] = useState(false);

  const atBottomRef = useRef(true);
  const [atBottom, setAtBottom] = useState(true);
  const [unread, setUnread] = useState(0);

  // ✅ state, чтобы ререндерилось и props Virtuoso менялись предсказуемо
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  useEffect(() => {
    const wsUrl = `${WS_URL}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const dto = JSON.parse(event.data);
        setPending((prev) => [...prev, dto]);

        if (!atBottomRef.current) {
          setUnread((n) => n + 1);
        }
      } catch {
        throw Error('Could not parse message');
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [token]);

  const scrollToBottom = () => {
    const last = messages.length - 1;
    if (last < 0) {
      return;
    }

    // 2 rAF — самый надёжный способ дождаться измерений Virtuoso
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        virtuosoRef.current?.scrollToIndex({ index: last, behavior: 'auto' });
      });
    });
  };

  // ✅ useLayoutEffect — после DOM-изменений, но до покраски
  useLayoutEffect(() => {
    if (initialScrollDone) {
      return;
    }
    if (messages.length === 0) {
      return;
    }

    scrollToBottom();
  }, [initialScrollDone, messages.length, scrollToBottom]);

  const handleBottomChange = (val: boolean) => {
    atBottomRef.current = val;
    setAtBottom(val);

    if (val) {
      setUnread(0);

      // ✅ считаем инициализацию завершённой только когда реально внизу
      if (!initialScrollDone) {
        setInitialScrollDone(true);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <div className={styles.connection}>
            <span
              className={clsx(styles.dot, {
                [styles.online]: isConnected,
                [styles.offline]: !isConnected,
              })}
            />
            <span className={styles.label}>
              {isConnected ? `Connected: (${WS_URL})` : 'Disconnected'}
            </span>
          </div>
          <div id="messagesDiv" className={styles.messages}>
            <Virtuoso
              ref={virtuosoRef}
              data={messages}
              alignToBottom
              atBottomStateChange={handleBottomChange}
              followOutput={
                initialScrollDone ? (isAtBottom) => (isAtBottom ? 'smooth' : false) : 'auto' // ✅ пока инициализируемся — всегда держим низ
              }
              itemContent={(_, message) => (
                <div className={styles.itemWrap}>
                  <MessageItem data={message} />
                </div>
              )}
            />

            <AtBottomButton
              atBottom={atBottom}
              unread={unread}
              messages={messages}
              virtuosoRef={virtuosoRef}
            />
          </div>

          <ChatBottom isConnected={isConnected} wsRef={wsRef} />
        </div>
      </div>
    </>
  );
};
