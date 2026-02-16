import { AtBottomButton } from '@/features/chat/middle/AtBottomButton';
import styles from '@/features/chat/ChatPage.module.css';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { MessageItem } from '@/features/chat/middle/MessageItem';
import { useLayoutEffect, useRef, useState } from 'react';
import type { MessageResponse } from '@/shared/api/messages/messages.types';

type Props = {
  messages: MessageResponse[];
};

export const ChatMiddle = ({ messages }: Props) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const atBottomRef = useRef(true);
  const [atBottom, setAtBottom] = useState(true);
  const [unread, setUnread] = useState(0);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  // Первый скролл вниз при входе / когда пришла история
  useLayoutEffect(() => {
    if (initialScrollDone) {
      return;
    }
    if (messages.length === 0) {
      return;
    }

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
  }, [initialScrollDone, messages.length]);

  // 2) считаем unread без эффектов — прямо на изменении списка
  const prevLenRef = useRef(0);
  if (prevLenRef.current !== messages.length) {
    const prev = prevLenRef.current;
    prevLenRef.current = messages.length;

    // добавились сообщения (не первая загрузка)
    if (prev !== 0 && messages.length > prev && !atBottomRef.current) {
      // ⚠️ setState в render обычно нельзя, поэтому завернём в microtask
      queueMicrotask(() => setUnread((n) => n + (messages.length - prev)));
    }
  }

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
  );
};
