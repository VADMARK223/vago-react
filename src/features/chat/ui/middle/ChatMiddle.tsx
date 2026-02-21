import styles from '@/features/chat/ChatPage.module.css';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { MessageItem } from '@/features/chat/ui/middle/MessageItem';
import { useRef } from 'react';
import type { UiMessage } from '@/shared/api/messages/messages.types';
import { AtBottomButton } from '@/features/chat/ui/middle/AtBottomButton';

/**
 * asdasd
 *
 */
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
    if (val) {
      console.log('ВНИЗУ');
    } else {
      console.log('НЕ ВНИЗУ');
    }

    onAtBottomChange(val);
  };

  return (
    <div id="messagesDiv" className={styles.messages}>
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        initialTopMostItemIndex={messages.length - 1} // При инициализации кидает в самый них
        atBottomThreshold={8}
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

      <AtBottomButton
        atBottom={atBottom}
        unread={unread}
        virtuosoRef={virtuosoRef}
        total={messages.length}
      />
    </div>
  );
};
