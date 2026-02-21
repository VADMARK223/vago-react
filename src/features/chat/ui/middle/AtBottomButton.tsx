import styles from '@/features/chat/ui/middle/ChatMiddle.module.css';
import type { RefObject } from 'react';
import type { VirtuosoHandle } from 'react-virtuoso';

type Props = {
  atBottom: boolean;
  unread: number;
  virtuosoRef: RefObject<VirtuosoHandle | null>;
  total: number;
};

export const AtBottomButton = ({ atBottom, unread, virtuosoRef }: Props) => {
  return (
    <>
      {!atBottom && unread > 0 && (
        <button
          className={styles.toBottom}
          onClick={() => {
            virtuosoRef.current?.scrollTo({
              top: 1000000,
              behavior: 'smooth',
            });

            requestAnimationFrame(() => {
              virtuosoRef.current?.scrollTo({ top: 1000000 });
            });
          }}
        >
          ↓ {unread}
        </button>
      )}
    </>
  );
};
