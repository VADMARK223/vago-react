import {Button, Form, Input, Space, Typography} from 'antd';
import {type SignInRequest, useMe, useSignInMutation} from './auth.ts';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import styles from './Auth.module.css';
import {ROUTE} from '../../constants/routes.ts';
import {CODE} from '../../constants/codes.ts';

export function SignInPage() {
    const [form] = Form.useForm();
    const login = Form.useWatch(CODE.LOGIN, form)
    const password = Form.useWatch(CODE.PASSWORD, form)
    const isDisabled = !login || !password
    const location = useLocation()
    const navigate = useNavigate()
    const signInMutation = useSignInMutation()
    const me = useMe()

    const from = (location.state as any)?.from?.pathname || ROUTE.HOME

    if (me.isSuccess) {
        return <Navigate to={ROUTE.HOME} replace/>
    }

    const onFinish = async (values: SignInRequest) => {
        signInMutation.mutate(values, {
            onSuccess: () => {
                navigate(from, {replace: true})
            }
        })
    }

    return (
        <div className={styles.panel}>
            <Typography.Title level={3} style={{marginTop: 0}}>
                Вход
            </Typography.Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Логин" name={CODE.LOGIN} rules={[{required: true, message: 'Введите логин'}]}>
                    <Input placeholder="Введите логин" allowClear/>
                </Form.Item>

                <Form.Item label="Пароль" name={CODE.PASSWORD} rules={[{required: true, message: 'Введите пароль'}]}>
                    <Input.Password placeholder="Введите пароль" allowClear/>
                </Form.Item>

                <Space orientation="vertical">
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isDisabled}
                        block
                        loading={signInMutation.isPending}
                    >
                        Войти
                    </Button>
                    <Link to={ROUTE.SIGN_UP}>Регистрация</Link>
                </Space>
            </Form>
        </div>
    )
}