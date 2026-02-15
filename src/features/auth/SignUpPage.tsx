import styles from './Auth.module.css';
import { App, Button, Form, Input, Select, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE, CODE } from '@/shared/constants';
import { useState } from 'react';
import capitalize from 'antd/es/_util/capitalize';
import { MAX_VALUE } from './constants';
import { type SignUpFormValues, type SignUpRole, toSignUpRequest, useSignUpMutation } from './auth';
import { getKyErrorMessage } from '@/shared/api/ky-client';

const DEFAULT_ROLE: SignUpRole = 'moderator';
const ROLE_HINT: Record<SignUpRole, string> = {
  moderator: 'Доступны все разделы с ограниченными правами.',
  user: 'Некоторые разделы недоступны.',
};

export function SignUpPage() {
  const { message } = App.useApp();
  const signUpMutation = useSignUpMutation();
  const [form] = Form.useForm();
  const login: string = Form.useWatch(CODE.LOGIN, form);
  const password: string = Form.useWatch(CODE.PASSWORD, form);
  const username: string = Form.useWatch(CODE.USERNAME, form);
  const role: SignUpRole = Form.useWatch(CODE.ROLE, form);
  const isDisabled: boolean = !login || !password || !username;
  const [usernameTouched, setUsernameTouched] = useState(false);
  const navigate = useNavigate();

  const handleValueChange = (changed: Partial<SignUpFormValues>) => {
    if (CODE.LOGIN in changed && !usernameTouched) {
      const login = changed[CODE.LOGIN];
      form.setFieldsValue({
        [CODE.USERNAME]: login ? `User${capitalize(login)}`.slice(0, MAX_VALUE.USERNAME) : '',
      });
    }
  };

  const onFinish = (values: SignUpFormValues) => {
    const req = toSignUpRequest(values);
    signUpMutation.mutate(req, {
      onSuccess: async (data) => {
        message.success(`${data.message}`);
        navigate(ROUTE.SIGN_IN, { replace: true });
      },
      onError: async (err) => {
        const serverMsg = await getKyErrorMessage(err);
        message.error(serverMsg ?? 'Ошибка входа');
      },
    });
  };

  return (
    <div className={styles.panel}>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        {' '}
        Регистрация{' '}
      </Typography.Title>

      <Form<SignUpFormValues>
        form={form}
        layout="vertical"
        onValuesChange={handleValueChange}
        onFinish={onFinish}
        initialValues={{ role: DEFAULT_ROLE }}
      >
        <Form.Item
          label="Логин"
          name={CODE.LOGIN}
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input placeholder="Введите логин" maxLength={MAX_VALUE.LOGIN} allowClear />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name={CODE.PASSWORD}
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder="Введите пароль" maxLength={MAX_VALUE.PASSWORD} allowClear />
        </Form.Item>

        <Form.Item
          label="Никнейм"
          name={CODE.USERNAME}
          rules={[{ required: true, message: 'Введите никнейм' }]}
          extra="Можно оставить автоматически сгенерированный"
        >
          <Input
            placeholder="Введите никнейм"
            maxLength={MAX_VALUE.USERNAME}
            onChange={() => setUsernameTouched(true)}
            allowClear
          />
        </Form.Item>

        <Form.Item label="Роль" name={CODE.ROLE} extra={ROLE_HINT[role]}>
          <Select
            options={[
              { value: CODE.MODERATOR, label: 'Модератор' },
              { value: CODE.USER, label: 'Пользователь' },
            ]}
          />
        </Form.Item>

        <Space orientation="vertical">
          <Button type="primary" htmlType="submit" disabled={isDisabled} block>
            Создать аккаунт
          </Button>
          <Link to={ROUTE.SIGN_IN}>Вход</Link>
        </Space>
      </Form>
    </div>
  );
}
