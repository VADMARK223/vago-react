import { UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type Props = {
  visible: boolean;
  onClick: () => void;
};

export function ToTopButton({ visible, onClick }: Props) {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<UpOutlined />}
      onClick={onClick}
      style={{
        position: 'absolute',
        right: 16,
        bottom: 16,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    />
  );
}
