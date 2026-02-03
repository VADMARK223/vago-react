import styles from './Auth.module.css'
import {App, Button, Form, Input, Space, Typography} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import {ROUTE} from '../../constants/routes.ts'
import {CODE} from '../../constants/codes.ts'
import {useState} from 'react'
import capitalize from 'antd/es/_util/capitalize'
import {MAX_VALUE} from './constants.ts'
import {type SignUpFormValues, toSignUpRequest, useSignUpMutation} from './auth.ts'
import {getKyErrorMessage} from '../../shared/api/kyClient.ts'

export function SignUpPage() {
    const {message} = App.useApp()
    const signUpMutation = useSignUpMutation()
    const [form] = Form.useForm()
    const login = Form.useWatch(CODE.LOGIN, form)
    const password = Form.useWatch(CODE.PASSWORD, form)
    const username = Form.useWatch(CODE.USERNAME, form)
    const isDisabled = !login || !password || !username
    const [usernameTouched, setUsernameTouched] = useState(false)
    const navigate = useNavigate()

    const handleValueChange = (changed: Partial<SignUpFormValues>) => {
        if (CODE.LOGIN in changed && !usernameTouched) {
            const login = changed[CODE.LOGIN]

            form.setFieldsValue({
                [CODE.USERNAME]: login ? `User${capitalize(login)}`.slice(0, MAX_VALUE.USERNAME) : '',
            })
        }
    }

    const onFinish = (values: SignUpFormValues) => {
        const req = toSignUpRequest(values)
        signUpMutation.mutate(req, {
            onSuccess: (data) => {
                message.success(`${data.message}`)
                navigate(ROUTE.SIGN_IN, {replace: true})
            },
            onError: async (err) => {
                const serverMsg = await getKyErrorMessage(err)
                message.error(serverMsg ?? 'Ошибка входа')
            }
        })
    }

    return (
        <div className={styles.panel}>
            <Typography.Title level={3} style={{marginTop: 0}}>
                Регистрация
            </Typography.Title>

            <Form<SignUpFormValues> form={form}
                                    layout="vertical"
                                    onValuesChange={handleValueChange}
                                    onFinish={onFinish}
            >
                <Form.Item label="Логин" name={CODE.LOGIN} rules={[{required: true, message: 'Введите логин'}]}>
                    <Input placeholder="Введите логин" maxLength={MAX_VALUE.LOGIN} allowClear/>
                </Form.Item>

                <Form.Item label="Пароль" name={CODE.PASSWORD} rules={[{required: true, message: 'Введите пароль'}]}>
                    <Input.Password placeholder="Введите пароль" maxLength={MAX_VALUE.PASSWORD} allowClear/>
                </Form.Item>

                <Form.Item label="Никнейм" name={CODE.USERNAME}
                           rules={[{required: true, message: 'Введите никнейм'}]}
                           extra={'Можно оставить автоматически сгенерированный'}>
                    <Input placeholder="Введите никнейм"
                           maxLength={MAX_VALUE.USERNAME}
                           onChange={() => setUsernameTouched(true)} allowClear/>
                </Form.Item>

                <Space orientation="vertical">
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isDisabled}
                        block
                    >
                        Создать аккаунт
                    </Button>
                    <Link to={ROUTE.SIGN_IN}>Вход</Link>
                </Space>
            </Form>
        </div>
    )
}
