import styles from '@/features/chat/ChatPage.module.css';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { MessageItem } from '@/features/chat/ui/middle/MessageItem';
import { useRef } from 'react';
import type { UiMessage } from '@/shared/api/messages/messages.types';
import { AtBottomButton } from '@/features/chat/ui/middle/AtBottomButton';

type Props = {
  messages: UiMessage[];
  atBottom: boolean;
  unread: number;
  onAtBottomChange: (val: boolean) => void;
};

export const ChatMiddle = ({ messages, atBottom, unread, onAtBottomChange }: Props) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  /**
   * Вызывается со значениями true/false, когда список достигает конца или прокручивается вверх.
   * Can be used to load newer items, like `tail -f`.
   */
  const handleBottomChange = (val: boolean) => {
    onAtBottomChange(val);
  };

  return (
    <div className={styles.messages}>
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        initialTopMostItemIndex={Math.max(messages.length - 1, 0)}
        atBottomThreshold={40}
        alignToBottom
        atBottomStateChange={handleBottomChange}
        followOutput={(isAtBottom) => (isAtBottom ? 'smooth' : false)}
        itemContent={(index, message) => (
          <>
            {index !== 0 && <div style={{ height: 8 }} />}
            <div
              className={`${styles.itemWrap} ${
                message.isMine ? styles.itemWrapMine : styles.itemWrapOther
              }`}
            >
              <MessageItem data={message} />
            </div>
          </>
        )}
      />

      <AtBottomButton atBottom={atBottom} unread={unread} virtuosoRef={virtuosoRef} />
    </div>
  );
};
