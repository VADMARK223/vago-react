import styles from '@/features/chat/top/ChatTop.module.css';
import clsx from 'clsx';
import { WS_URL } from '@/features/chat/chat';
import { DeleteAllMessagesButton } from '@/features/admin/messages/DeleteAllMessagesButton';

type Props = {
  isConnected: boolean;
  clearPending: () => void;
};

export const ChatTop = ({ isConnected, clearPending }: Props) => {
  return (
    <div className={styles.connection}>
      <div className={styles.status}>
        <span
          className={clsx(styles.dot, {
            [styles.online]: isConnected,
            [styles.offline]: !isConnected,
          })}
        />
        <span className={styles.label}>
          {isConnected ? `Connected: (${WS_URL})` : 'Disconnected'}
        </span>
      </div>

      <div className={styles.actions}>
        <DeleteAllMessagesButton clearPending={clearPending} />
      </div>
    </div>
  );
};
