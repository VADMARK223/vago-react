import { AtBottomButton } from '@/features/chat/ui/middle/AtBottomButton';
import styles from '@/features/chat/ChatPage.module.css';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { MessageItem } from '@/features/chat/ui/middle/MessageItem';
import { useLayoutEffect, useRef, useState } from 'react';
import type { UiMessage } from '@/shared/api/messages/messages.types';

type Props = {
  messages: UiMessage[];
  atBottom: boolean;
  unread: number;
  onAtBottomChange: (val: boolean) => void;
};

export const ChatMiddle = ({ messages, atBottom, unread, onAtBottomChange }: Props) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

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

  const handleBottomChange = (val: boolean) => {
    onAtBottomChange(val);

    if (val && !initialScrollDone) {
      setInitialScrollDone(true);
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
        components={{
          Item: (props) => <div {...props} className={styles.vItem} />,
        }}
        itemContent={(_, message) => (
          <div
            className={`${styles.itemWrap} ${
              message.isMine ? styles.itemWrapMine : styles.itemWrapOther
            }`}
          >
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
