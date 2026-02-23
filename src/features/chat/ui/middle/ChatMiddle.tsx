import styles from '@/features/chat/ui/middle/ChatMiddle.module.css';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { MessageItem } from '@/features/chat/ui/middle/MessageItem';
import { useRef } from 'react';
import { AtBottomButton } from '@/features/chat/ui/middle/AtBottomButton';
import type { ChatListItem } from '@/features/chat/chat-page';
import { DateItem } from '@/features/chat/ui/middle/DateItem';

type Props = {
  messages: ChatListItem[];
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
        itemContent={(index, item) => {
          if (item.kind === 'date') {
            return <DateItem label={item.label} />;
          }

          const message = item.msg;
          return (
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
          );
        }}
      />

      <AtBottomButton atBottom={atBottom} unread={unread} virtuosoRef={virtuosoRef} />
    </div>
  );
};
