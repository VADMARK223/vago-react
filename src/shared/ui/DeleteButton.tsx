import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type Props = {
  onClick: () => void;
  loading: boolean;
};

export const DeleteButton = ({ onClick, loading }: Props) => {
  return (
    <Button
      type="primary"
      danger
      onClick={onClick}
      loading={loading}
      size="large"
      icon={<DeleteOutlined />}
    />
  );
};
