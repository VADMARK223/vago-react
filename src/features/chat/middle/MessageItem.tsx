import styles from '@/features/chat/ChatPage.module.css';
import { Typography } from 'antd';
import type { MessageResponse } from '@/shared/api/messages/messages.types';
import { DeleteMessageButton } from '@/features/admin/messages/DeleteMessageButton';

type Props = {
  data: MessageResponse;
  removeFromPending: (id: number) => void;
};

export const MessageItem = ({ data, removeFromPending }: Props) => {
  return (
    <div className={styles.message}>
      <div>
        <b>{data.username}</b>
      </div>
      <div className={styles.messageBody}>{data.body}</div>
      <div>
        <Typography.Text type="secondary">{data.sentAt}</Typography.Text>
        <DeleteMessageButton id={data.id} removeFromPending={removeFromPending} />
      </div>
    </div>
  );
};
