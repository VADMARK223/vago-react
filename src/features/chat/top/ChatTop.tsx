import styles from '@/features/chat/ChatPage.module.css';
import clsx from 'clsx';
import { WS_URL } from '@/features/chat/chat';
import { DeleteAllMessagesButton } from '@/features/admin/messages/DeleteAllMessagesButton';

type Props = {
  isConnected: boolean;
};

export const ChatTop = ({ isConnected }: Props) => {
  return (
    <div className={styles.connection}>
      <span
        className={clsx(styles.dot, {
          [styles.online]: isConnected,
          [styles.offline]: !isConnected,
        })}
      />
      <span className={styles.label}>
        {isConnected ? `Connected: (${WS_URL})` : 'Disconnected'}
      </span>
      <DeleteAllMessagesButton />
    </div>
  );
};
