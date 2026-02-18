import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type Props = {
  onSend: () => void;
  disabled: boolean;
};

export const SendButton = ({ onSend, disabled }: Props) => {
  return <Button type="primary" icon={<SendOutlined />} onClick={onSend} disabled={disabled} />;
};
