import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {Link, Outlet, useLocation} from "react-router-dom";
import {BookOutlined, HomeOutlined, LogoutOutlined, ScheduleOutlined,} from "@ant-design/icons";
import {useMemo, useState} from "react";
import {AppHeader} from "./AppHeader.tsx";

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
                        {key: "/", icon: <HomeOutlined/>, label: <Link to="/">Главная</Link>},
                        {key: "/test", icon: <ScheduleOutlined/>, label: <Link to="/test">Тест</Link>},
                        {key: "/book", icon: <BookOutlined/>, label: <Link to="/book">Книга</Link>},
                        {type: "divider" as const},
                        {key: "/logout", icon: <LogoutOutlined/>, label: <Link to="/logout">Выйти</Link>},
                    ]}
                />
            </Sider>

            <Layout>
                <AppHeader collapsed={collapsed} onToggleCollapse={() => {
                    setCollapsed((v) => !v)
                }}/>
                <Content>
                    <div
                        style={{
                            border: "1px solid rgba(0,0,0,0.06)",
                            borderRadius: 12,
                            padding: 16,
                            minHeight: "calc(100vh - 64px - 32px)",
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}