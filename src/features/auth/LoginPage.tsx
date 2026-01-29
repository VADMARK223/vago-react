import {Button, Form, Input, Typography} from "antd";
import {type LoginRequest, useLoginMutation, useMe} from "./auth.ts";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

export function LoginPage() {
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
        <div style={{ maxWidth: 360, margin: "0 auto" }}>
            <Typography.Title level={3} style={{ marginTop: 0 }}>
                Вход
            </Typography.Title>

            <Form
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Логин" name="login" rules={[{ required: true, message: "Введи логин" }]}>
                    <Input placeholder="Введите логин" />
                </Form.Item>

                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Введи пароль" }]}>
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loginMutation.isPending}
                >
                    Войти
                </Button>
            </Form>
        </div>
    )
}