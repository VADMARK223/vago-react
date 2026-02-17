import styles from '@/features/chat/top/ChatTop.module.css';
import clsx from 'clsx';
import { DeleteAllMessagesButton } from '@/features/admin/messages/DeleteAllMessagesButton';
import { Tooltip } from 'antd';

type Props = {
  wsUrl: string;
  isConnected: boolean;
  clearPending: () => void;
};

export const ChatTop = ({ wsUrl, isConnected, clearPending }: Props) => {
  return (
    <div className={styles.connection}>
      <Tooltip title={isConnected ? `${wsUrl}` : `${wsUrl}`}>
        <div className={styles.status}>
          <span
            className={clsx(styles.dot, {
              [styles.online]: isConnected,
              [styles.offline]: !isConnected,
            })}
          />
        </div>
      </Tooltip>
      <span className={styles.label}>{isConnected ? 'Онлайн' : 'Офлайн'}</span>
      <div className={styles.actions}>
        <DeleteAllMessagesButton clearPending={clearPending} />
      </div>
    </div>
  );
};
