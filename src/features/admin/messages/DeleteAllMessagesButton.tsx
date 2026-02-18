import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type Props = {
  clearFn: () => void;
  disable: boolean;
};

export const DeleteAllMessagesButton = ({ clearFn, disable }: Props) => {
  return (
    <Button
      danger
      disabled={disable}
      onClick={() => {
        clearFn();
      }}
      icon={<DeleteOutlined />}
    >
      Удалить все сообщения
    </Button>
  );
};
