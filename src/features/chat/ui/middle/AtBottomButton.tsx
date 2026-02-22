import styles from '@/features/chat/ui/middle/ChatMiddle.module.css';
import { type RefObject } from 'react';
import type { VirtuosoHandle } from 'react-virtuoso';
import { VagoButton } from '@/shared/ui/VagoButton';
import { ChevronDown } from 'lucide-react';

type Props = {
  atBottom: boolean;
  unread: number;
  virtuosoRef: RefObject<VirtuosoHandle | null>;
};

export const AtBottomButton = ({ atBottom, unread, virtuosoRef }: Props) => {
  const visible = !atBottom;

  return (
    <div className={`${styles.toBottomWrap} ${visible ? styles.toBottomVisible : ''}`}>
      <VagoButton
        shape="circle"
        icon={ChevronDown}
        className={styles.toBottomBtn}
        onClick={() => {
          virtuosoRef.current?.scrollToIndex({
            index: 'LAST',
            align: 'end',
            behavior: 'smooth',
          });
        }}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
      />

      {unread > 0 && (
        <span className={styles.unreadBadge} aria-label={`Непрочитанных: ${unread}`}>
          {unread}
        </span>
      )}
    </div>
  );
};
