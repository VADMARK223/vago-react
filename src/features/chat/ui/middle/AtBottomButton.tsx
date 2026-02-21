import styles from '@/features/chat/ChatPage.module.css';
import type { RefObject } from 'react';
import type { VirtuosoHandle } from 'react-virtuoso';

type Props = {
  atBottom: boolean;
  unread: number;
  virtuosoRef: RefObject<VirtuosoHandle | null>;
};

export const AtBottomButton = ({ atBottom, unread, virtuosoRef }: Props) => {
  return (
    <>
      {!atBottom && unread > 0 && (
        <button
          className={styles.toBottom}
          onClick={() => {
            virtuosoRef.current?.scrollToIndex({
              index: 'LAST',
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
