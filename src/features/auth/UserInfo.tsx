import {useMe, useSignInRedirect} from './auth.ts'
import {Button, Space} from 'antd'
import {useLocation} from 'react-router-dom'
import {LoginOutlined} from '@ant-design/icons'
import {SignOutButton} from './SignOutButton.tsx'
import {ROUTE} from '../../constants/routes.ts'

export function UserInfo() {
    const {data: me, isLoading} = useMe()
    const location = useLocation()
    const goSignIn = useSignInRedirect()

    if (isLoading) return <div>Загрузка...</div>

    if (!me) return <Space orientation={'horizontal'}>
        <p>Привет, Гость!</p>
        {location.pathname !== ROUTE.SIGN_IN && (<Button icon={<LoginOutlined/>} onClick={() => {
            goSignIn(location.pathname)
        }}>Войти</Button>)}
    </Space>

    return <Space orientation={'horizontal'}>
        <span>Привет, {me?.username}!</span>
        <SignOutButton/>
    </Space>
}