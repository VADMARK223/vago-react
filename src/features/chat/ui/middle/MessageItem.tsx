import styles from '@/features/chat/ui/middle/ChatMiddle.module.css';
import { Typography } from 'antd';
import { DeleteMessageButton } from '@/features/message/delete/DeleteMessageButton';
import { formatTime, type UiMessage } from '@/features/chat/chat-page';

type Props = {
  data: UiMessage;
};

export const MessageItem = ({ data }: Props) => {
  return (
    <div className={`${styles.messageContainer} ${data.isMine ? styles.mine : styles.other}`}>
      <div className={styles.messageHeader}>
        {data.isMine ? <b>Вы</b> : <b className={styles.username}>{data.username}</b>}
        {data.isMine && (
          <div className={styles.messageActions}>
            <DeleteMessageButton id={data.id} size="small" />
          </div>
        )}
      </div>
      <div className={styles.messageBody}>{data.body}</div>
      <div>
        <Typography.Text type="secondary">{formatTime(new Date(data.sentAt))}</Typography.Text>
      </div>
    </div>
  );
};
