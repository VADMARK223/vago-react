import styles from '@/features/chat/ui/middle/ChatMiddle.module.css';
import type { RefObject } from 'react';
import type { VirtuosoHandle } from 'react-virtuoso';

type Props = {
  atBottom: boolean;
  unread: number;
  virtuosoRef: RefObject<VirtuosoHandle | null>;
  total: number;
};

export const AtBottomButton = ({ atBottom, unread, virtuosoRef, total }: Props) => {
  return (
    <>
      {!atBottom && unread > 0 && (
        <button
          className={styles.toBottom}
          onClick={() => {
            const last = total - 1;
            if (last < 0) {
              return;
            }

            virtuosoRef.current?.scrollToIndex({
              index: last,
              align: 'end',
              behavior: 'smooth',
            });

            // добивка после измерений/перерендера
            requestAnimationFrame(() => {
              virtuosoRef.current?.scrollToIndex({ index: last, align: 'end' });
            });
          }}
        >
          ↓ {unread}
        </button>
      )}
    </>
  );
};
