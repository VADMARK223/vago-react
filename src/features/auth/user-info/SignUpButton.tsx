import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';
import { SignatureOutlined } from '@ant-design/icons';

export const SignUpButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTE.SIGN_UP);
  };

  return (
    <Button type="primary" onClick={handleClick} icon={<SignatureOutlined />}>
      Регистрация
    </Button>
  );
};
