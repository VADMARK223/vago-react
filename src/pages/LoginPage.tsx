import { Button, Form, Input, Typography } from "antd";

export function LoginPage() {
    return (
        <div style={{ maxWidth: 360 }}>
            <Typography.Title level={3} style={{ marginTop: 0 }}>Вход</Typography.Title>

            <Form layout="vertical" onFinish={(v) => console.log("login", v)}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: "Введи email" }]}>
                    <Input placeholder="you@example.com" />
                </Form.Item>

                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Введи пароль" }]}>
                    <Input.Password placeholder="••••••••" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Войти
                </Button>
            </Form>
        </div>
    )
}