import { Button, Form, Input, Typography } from "antd";
import {useLoginMutation, useMe} from "../hooks/auth.ts";

export function LoginPage() {
    const loginMutation = useLoginMutation()
    const me = useMe()

    if (me.isSuccess) {
        return <div style={{maxWidth: 360, margin:"0 auto"}}>Ты уже залогинен как #{me.data.username}</div>
    }

    return (
        <div style={{ maxWidth: 360, margin: "0 auto" }}>
            <Typography.Title level={3} style={{ marginTop: 0 }}>
                Вход
            </Typography.Title>

            <Form
                layout="vertical"
                onFinish={(values) => loginMutation.mutate(values)}
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