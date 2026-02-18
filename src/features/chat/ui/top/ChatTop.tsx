import styles from '@/features/chat/ui/top/ChatTop.module.css';
import clsx from 'clsx';
import { DeleteAllMessagesButton } from '@/features/message/delete-all/DeleteAllMessagesButton';
import { Tooltip } from 'antd';

type Props = {
  wsUrl: string;
  isConnected: boolean;
};

export const ChatTop = ({ wsUrl, isConnected }: Props) => {
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
        <DeleteAllMessagesButton />
      </div>
    </div>
  );
};
