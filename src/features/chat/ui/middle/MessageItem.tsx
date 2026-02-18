import styles from '@/features/chat/ui/middle/ChatMiddle.module.css';
import { Typography } from 'antd';
import type { UiMessage } from '@/shared/api/messages/messages.types';
import { DeleteMessageButton } from '@/features/admin/messages/DeleteMessageButton';

type Props = {
  data: UiMessage;
  removeFromPending: (id: number) => void;
};

export const MessageItem = ({ data, removeFromPending }: Props) => {
  return (
    <div className={`${styles.messageContainer} ${data.isMine ? styles.mine : styles.other}`}>
      <div className={styles.messageHeader}>
        {data.isMine ? <b className={styles.username}>{data.username}</b> : <b>Вы</b>}
        <div className={styles.messageActions}>
          <DeleteMessageButton id={data.id} removeFromPending={removeFromPending} size="small" />
        </div>
      </div>
      <div className={styles.messageBody}>{data.body}</div>
      <div>
        <Typography.Text type="secondary">{data.sentAt}</Typography.Text>
      </div>
    </div>
  );
};
