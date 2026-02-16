import styles from '@/features/chat/middle/ChatMiddle.module.css';
import { Typography } from 'antd';
import type { MessageResponse } from '@/shared/api/messages/messages.types';
import { DeleteMessageButton } from '@/features/admin/messages/DeleteMessageButton';

type Props = {
  data: MessageResponse;
  removeFromPending: (id: number) => void;
};

export const MessageItem = ({ data, removeFromPending }: Props) => {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageHeader}>
        <b>{data.username}</b>
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
