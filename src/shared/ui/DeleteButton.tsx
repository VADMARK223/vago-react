import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import * as React from 'react';

type Props = {
  onClick: () => void;
  loading: boolean;
  size?: React.ComponentProps<typeof Button>['size'];
};

export const DeleteButton = ({ onClick, loading, size = 'middle' }: Props) => {
  return (
    <Button
      type="primary"
      danger
      onClick={onClick}
      loading={loading}
      size={size}
      icon={<DeleteOutlined />}
    />
  );
};
