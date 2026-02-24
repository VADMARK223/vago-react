import { App, Button, Form, Input, Typography } from 'antd';
import { type AuthRedirectState, type SignInRequest, useSignInMutation } from './auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { CODE, ROUTE } from '@/shared/constants';
import { getKyErrorMessage } from '@/shared/api/ky-client';
import { HStack } from '@/shared/ui/h-stack/HStack';

export function SignInPage() {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const login = Form.useWatch(CODE.LOGIN, form);
  const password = Form.useWatch(CODE.PASSWORD, form);
  const isDisabled = !login || !password;
  const location = useLocation();
  const navigate = useNavigate();
  const signInMutation = useSignInMutation();

  const from = (location.state as AuthRedirectState | null)?.from?.pathname ?? ROUTE.HOME;

  const onFinish = async (values: SignInRequest) => {
    signInMutation.mutate(values, {
      onSuccess: (data) => {
        message.success(data.message);
        navigate(from, { replace: true });
      },
      onError: async (error) => {
        const serverMsg = await getKyErrorMessage(error);
        message.error(serverMsg ?? 'Ошибка входа');
      },
    });
  };

  return (
    <div className={styles.panel}>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Вход
      </Typography.Title>

      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="on">
        <Form.Item
          label="Логин"
          name={CODE.LOGIN}
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input placeholder="Введите логин" allowClear autoComplete="username" autoFocus />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name={CODE.PASSWORD}
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder="Введите пароль" allowClear autoComplete="current-password" />
        </Form.Item>

        <HStack>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isDisabled}
            loading={signInMutation.isPending}
          >
            Войти
          </Button>
          <Link to={ROUTE.SIGN_UP}>Регистрация</Link>
        </HStack>
      </Form>
    </div>
  );
}
