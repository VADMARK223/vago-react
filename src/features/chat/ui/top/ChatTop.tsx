import styles from '@/features/chat/ui/top/ChatTop.module.css';
import clsx from 'clsx';
import { DeleteAllMessagesButton } from '@/features/message/delete-all/DeleteAllMessagesButton';
import { Tooltip } from 'antd';
import type { OnlineUser } from '@/features/chat/model/chat.store';

type Props = {
  wsUrl: string;
  isConnected: boolean;
  onlineUsers: OnlineUser[];
};

export const ChatTop = ({ wsUrl, onlineUsers, isConnected }: Props) => {
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

      {isConnected && <span className={styles.subLabel}>{getCountUserText(onlineUsers)}</span>}
      <div className={styles.actions}>
        <DeleteAllMessagesButton />
      </div>
    </div>
  );
};

const getCountUserText = (userCount: OnlineUser[]): string => {
  const count = userCount.length + 1;

  if (count === 1) {
    return 'В чате пока только вы 😊';
  }
  if (count < 5) {
    return `${count} пользователя`;
  }
  return `${count} пользователей`;
};
