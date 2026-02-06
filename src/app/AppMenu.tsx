import {Menu, type MenuProps} from 'antd'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useMemo} from 'react'
import {ROUTE} from '../constants/routes.ts'
import {
    HomeOutlined,
    ReadOutlined,
    RobotOutlined,
    ScheduleOutlined,
    UnorderedListOutlined,
    WechatOutlined
} from '@ant-design/icons'
import {useAuth, useSignInRedirect} from '../features/auth/auth.ts'

export function AppMenu() {
    const navigate = useNavigate()
    const location = useLocation()
    const goSignIn = useSignInRedirect()
    const {isAuthed, isAdminModerator, isLoading} = useAuth()

    const selectedKey = useMemo(() => {
        const path = location.pathname
        if (path.startsWith(ROUTE.BOOK)) return ROUTE.BOOK
        return location.pathname
    }, [location.pathname])

    const items: MenuProps['items'] = [
        {key: '/', icon: <HomeOutlined/>, label: <Link to="/">Главная</Link>},
        {key: ROUTE.BOOK, icon: <ReadOutlined/>, label: <Link to={ROUTE.BOOK}>Книга (TS / React)</Link>},
        {key: ROUTE.TEST, icon: <ScheduleOutlined/>, label: <Link to={ROUTE.TEST}>Тест (Go)</Link>},
        {key: ROUTE.QUESTIONS, icon: <ScheduleOutlined/>, label: <Link to={ROUTE.QUESTIONS}>Вопросы (Go)</Link>},
        {type: 'divider' as const},
        {
            key: ROUTE.TASKS,
            icon: <UnorderedListOutlined/>,
            label: <Link to={ROUTE.TASKS}>Задачи</Link>
        },
        {
            key: ROUTE.CHAT,
            icon: <WechatOutlined/>,
            label: <Link to={ROUTE.CHAT}>Чат</Link>
        },
        {
            key: '/admin',
            icon: <RobotOutlined/>,
            label: <Link to="/admin">Админка</Link>,
            disabled: isLoading || !isAuthed || !isAdminModerator,
        },
    ]

    const onClick: MenuProps['onClick'] = ({key}) => {
        if (isLoading) {
            return
        }

        if (key === ROUTE.TASKS && !isAuthed) {
            goSignIn(ROUTE.TASKS)
            return
        }

        navigate(key)
    }

    return (
        <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={items}
            onClick={onClick}
        />
    )
}
