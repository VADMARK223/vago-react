import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';
import { SignatureOutlined } from '@ant-design/icons';

type Props = {
  onClick?: () => void;
};

export const SignUpButton = ({ onClick }: Props) => {
  return (
    <Link to={ROUTE.SIGN_UP} onClick={onClick}>
      <Button type="primary" icon={<SignatureOutlined />}>
        Регистрация
      </Button>
    </Link>
  );
};
