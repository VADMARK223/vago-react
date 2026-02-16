import styles from '@/features/chat/ChatPage.module.css';
import { Typography } from 'antd';
import type { MessageResponse } from '@/shared/api/messages/messages.types';

type Props = {
  data: MessageResponse;
};

export const MessageItem = ({ data }: Props) => {
  return (
    <div className={styles.message}>
      <div>
        <b>{data.username}</b>
      </div>
      <div className={styles.messageBody}>{data.body}</div>
      <div>
        <Typography.Text type="secondary">{data.sentAt}</Typography.Text>
      </div>
    </div>
  );
};
