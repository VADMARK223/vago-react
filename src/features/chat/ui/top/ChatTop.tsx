import styles from '@/features/chat/ui/top/ChatTop.module.css';
import clsx from 'clsx';
import { DeleteAllMessagesButton } from '@/features/admin/messages/DeleteAllMessagesButton';
import { Tooltip } from 'antd';
import { useChatStore } from '@/features/chat/model/chat.store';

type Props = {
  wsUrl: string;
  isConnected: boolean;
};

export const ChatTop = ({ wsUrl, isConnected }: Props) => {
  const liveMessages = useChatStore((s) => s.liveMessages);
  const clearLiveMessages = useChatStore((s) => s.clearLiveMessages);

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
        <DeleteAllMessagesButton clearFn={clearLiveMessages} disable={liveMessages.length === 0} />
      </div>
    </div>
  );
};
