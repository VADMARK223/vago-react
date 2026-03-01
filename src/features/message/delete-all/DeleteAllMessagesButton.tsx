import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAllDeleteMessages } from '@/features/message/delete-all/use-all-delete-messages';
import type { MessageDTO } from '@/shared/api/messages/messages.types';

type Props = {
  messages?: MessageDTO[];
};

export const DeleteAllMessagesButton = ({ messages }: Props) => {
  const allDeleteMessages = useAllDeleteMessages();

  return (
    <Button
      danger
      disabled={messages?.length === 0}
      onClick={() => {
        allDeleteMessages.mutate();
      }}
      icon={<DeleteOutlined />}
    >
      Удалить все сообщения
    </Button>
  );
};
