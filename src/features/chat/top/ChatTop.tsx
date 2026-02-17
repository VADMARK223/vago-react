import styles from '@/features/chat/top/ChatTop.module.css';
import clsx from 'clsx';
import { DeleteAllMessagesButton } from '@/features/admin/messages/DeleteAllMessagesButton';

type Props = {
  wsUrl: string;
  isConnected: boolean;
  clearPending: () => void;
};

export const ChatTop = ({ wsUrl, isConnected, clearPending }: Props) => {
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
          {isConnected ? `Connected: (${wsUrl})` : `Disconnected: (${wsUrl})`}
        </span>
      </div>

      <div className={styles.actions}>
        <DeleteAllMessagesButton clearPending={clearPending} />
      </div>
    </div>
  );
};
