import {Layout, Menu, type MenuProps} from 'antd'
import Sider from 'antd/es/layout/Sider'
import {Content} from 'antd/es/layout/layout'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {HomeOutlined, ReadOutlined, RobotOutlined, ScheduleOutlined, UnorderedListOutlined, WechatOutlined,} from '@ant-design/icons'
import {useMemo, useState} from 'react'
import {AppHeader} from './AppHeader.tsx'
import {ROUTE} from '../constants/routes.ts'
import {useAuth, useSignInRedirect} from '../features/auth/auth.ts'

export function AppLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const goSignIn = useSignInRedirect()
    const {isAuthed, isAdmin, isLoading} = useAuth()

    const selectedKey = useMemo(() => {
        const path = location.pathname
        if (path.startsWith(ROUTE.BOOK)) return ROUTE.BOOK
        return location.pathname
    }, [location.pathname])

    const items: MenuProps['items'] = [
        {key: '/', icon: <HomeOutlined/>, label: <Link to="/">Главная</Link>},
        {key: '/test', icon: <ScheduleOutlined/>, label: <Link to="/test">Тест</Link>},
        {key: ROUTE.BOOK, icon: <ReadOutlined/>, label: <Link to={ROUTE.BOOK}>Книга (TS / React)</Link>},
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
            disabled: isLoading || !isAuthed || !isAdmin,
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
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} trigger={null}>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={items}
                    onClick={onClick}
                />
            </Sider>

            <Layout>
                <AppHeader collapsed={collapsed} onToggleCollapse={() => {
                    setCollapsed((v) => !v)
                }}/>
                <Content>
                    <div className={'content'}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}