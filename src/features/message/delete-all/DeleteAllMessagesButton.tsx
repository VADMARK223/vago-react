import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAllDeleteMessages } from '@/features/message/delete-all/use-all-delete-messages';

export const DeleteAllMessagesButton = () => {
  const allDeleteMessages = useAllDeleteMessages();

  return (
    <Button
      danger
      disabled={false}
      onClick={() => {
        allDeleteMessages.mutate();
      }}
      icon={<DeleteOutlined />}
    >
      Удалить все сообщения
    </Button>
  );
};
