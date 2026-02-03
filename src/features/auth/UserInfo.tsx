import {type AuthRedirectState, useMe} from './auth.ts'
import {Button, Space} from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'
import {LoginOutlined} from '@ant-design/icons'
import {SignOutButton} from './SignOutButton.tsx'
import {ROUTE} from '../../constants/routes.ts'

export function UserInfo() {
    const {data: user, isLoading, error} = useMe()
    const navigate = useNavigate()
    const location = useLocation()

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <Space orientation={'horizontal'}>
        <p>Привет, Гость!</p>
        {location.pathname !== ROUTE.SIGN_IN && (<Button icon={<LoginOutlined/>} onClick={() => {
            const state: AuthRedirectState = {
                from: {pathname: location.pathname},
            }

            navigate(ROUTE.SIGN_IN, {state})
        }}>Войти</Button>)}
    </Space>

    return <Space orientation={'horizontal'}>
        <span>Привет, {user?.username}!</span>
        <SignOutButton/>
    </Space>
}