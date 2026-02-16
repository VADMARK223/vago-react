import styles from '@/features/chat/ChatPage.module.css';
import type { MessageResponse } from '@/shared/api/messages/messages.types';
import type { RefObject } from 'react';
import type { VirtuosoHandle } from 'react-virtuoso';

type Props = {
  atBottom: boolean;
  unread: number;
  messages: MessageResponse[];
  virtuosoRef: RefObject<VirtuosoHandle | null>;
};

export const AtBottomButton = ({ atBottom, unread, messages, virtuosoRef }: Props) => {
  return (
    <>
      {!atBottom && unread > 0 && (
        <button
          className={styles.toBottom}
          onClick={() => {
            const last = messages.length - 1;
            if (last < 0) {
              return;
            }
            virtuosoRef.current?.scrollToIndex({
              index: last,
              behavior: 'smooth',
            });
          }}
        >
          ↓ {unread}
        </button>
      )}
    </>
  );
};
