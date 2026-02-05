import {Layout} from 'antd'
import Sider from 'antd/es/layout/Sider'
import {Content} from 'antd/es/layout/layout'
import {Outlet} from 'react-router-dom'
import {useState} from 'react'
import {AppHeader} from './AppHeader.tsx'
import {AppMenu} from './AppMenu.tsx'

export function AppLayout() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} trigger={null}>
                <AppMenu/>
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