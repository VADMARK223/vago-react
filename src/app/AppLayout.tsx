import {Layout, Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content} from 'antd/es/layout/layout';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {HomeOutlined, ReadOutlined, RobotOutlined, ScheduleOutlined, UnorderedListOutlined,} from '@ant-design/icons';
import {useMemo, useState} from 'react';
import {AppHeader} from './AppHeader.tsx';
import {ROUTE} from '../constants/routes.ts';

export function AppLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation();

    const selectedKey = useMemo(() => {
        return location.pathname;
        /*const path = location.pathname;
        if (path.startsWith("/login")) return "/login";
        return "/";*/
    }, [location.pathname])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} trigger={null}>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={[
                        {key: '/', icon: <HomeOutlined/>, label: <Link to="/">Главная</Link>},
                        {key: '/test', icon: <ScheduleOutlined/>, label: <Link to="/test">Тест</Link>},
                        {key: '/book', icon: <ReadOutlined/>, label: <Link to="/book">Книга</Link>},
                        {type: 'divider' as const},
                        {key: '/admin', icon: <RobotOutlined/>, label: <Link to="/admin">Админка</Link>},
                        {key: ROUTE.TASKS, icon: <UnorderedListOutlined/>, label: <Link to={ROUTE.TASKS}>Задачи</Link>},
                    ]}
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