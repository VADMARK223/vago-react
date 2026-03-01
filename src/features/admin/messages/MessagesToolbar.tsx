import styles from './MessagesTab.module.css';
import { DeleteAllMessagesButton } from '@/features/message/delete-all/DeleteAllMessagesButton';
import type { MessageDTO } from '@/shared/api/messages/messages.types';

type Props = {
  messages: MessageDTO[];
};

const getText = (messages: MessageDTO[]): string => {
  if (messages.length == 0) {
    return 'Сообщений пока нет';
  }

  return `Всего: ${messages.length}`;
};

export const MessagesToolbar = ({ messages }: Props) => {
  return (
    <div className={styles.toolbar}>
      <div>{getText(messages)}</div>
      <DeleteAllMessagesButton messages={messages} />
    </div>
  );
};
