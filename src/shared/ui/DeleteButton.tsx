import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import * as React from 'react';

type Props = {
  onClick: () => void;
  size?: React.ComponentProps<typeof Button>['size'];
  loading?: boolean;
};

export const DeleteButton = ({ onClick, loading = false, size = 'middle' }: Props) => {
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
