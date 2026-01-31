import {Button, Form, Input, Space, Typography} from "antd";
import {type LoginRequest, useLoginMutation, useMe} from "./auth.ts";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import styles from "./Auth.module.css";
import {ROUTES} from "../../constants/routes.ts";
import {CODES} from "../../constants/codes.ts";

export function SignInPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const loginMutation = useLoginMutation()
    const me = useMe()

    const from = (location.state as any)?.from?.pathname || "/"

    if (me.isSuccess) {
        return <Navigate to={"/"} replace/>
    }

    const onFinish = async (values: LoginRequest) => {
        loginMutation.mutate(values, {
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
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Логин" name={CODES.LOGIN} rules={[{required: true, message: "Введите логин"}]}>
                    <Input placeholder="Введите логин" allowClear/>
                </Form.Item>

                <Form.Item label="Пароль" name={CODES.PASSWORD} rules={[{required: true, message: "Введите пароль"}]}>
                    <Input.Password placeholder="Введите пароль" allowClear/>
                </Form.Item>

                <Space orientation="vertical">
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loginMutation.isPending}
                    >
                        Войти
                    </Button>
                    <Link to={ROUTES.SIGN_UP}>Регистрация</Link>
                </Space>
            </Form>
        </div>
    )
}