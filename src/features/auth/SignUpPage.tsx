import styles from "./Auth.module.css"
import {Button, Form, Input, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes.ts";
import {CODES} from "../../constants/codes.ts";

export function SignUpPage() {
    return (
        <div className={styles.panel}>
            <Typography.Title level={3} style={{marginTop: 0}}>
                Регистрация
            </Typography.Title>

            <Form
                layout="vertical"
                // onFinish={onFinish}
            >
                <Form.Item label="Логин" name={CODES.LOGIN} rules={[{required: true, message: "Введите логин"}]}>
                    <Input placeholder="Введите логин" allowClear/>
                </Form.Item>

                <Form.Item label="Пароль" name={CODES.PASSWORD} rules={[{required: true, message: "Введите пароль"}]}>
                    <Input.Password placeholder="Введите пароль" allowClear/>
                </Form.Item>

                <Form.Item label="Никнейм" name={CODES.USERNAME} rules={[{required: true, message: "Введите никнейм"}]}>
                    <Input.Password placeholder="Введите никнейм" allowClear/>
                </Form.Item>

                <Form.Item label="E-mail" name={CODES.USERNAME} rules={[{required: true, message: "Введите вашу почту"}]}>
                    <Input.Password placeholder="Введите вашу почту" allowClear/>
                </Form.Item>

                <Space orientation="vertical">
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        // loading={loginMutation.isPending}
                    >
                        Создать аккаунт
                    </Button>
                    <Link to={ROUTES.SIGN_IN}>Вход</Link>
                </Space>
            </Form>
        </div>
    )
}
