import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Props {
  isCompact?: boolean;
}

export const GoButton = ({ isCompact }: Props) => {
  return (
    <Button
      type="primary"
      color="volcano"
      variant="solid"
      onClick={() => {
        window.location.href = '/';
      }}
      icon={<GoogleOutlined />}
    >
      {!isCompact && 'Портал на Golang'}
    </Button>
  );
};
