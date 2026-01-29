import {Button, Layout, Menu, Space, Typography} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import {Link, Outlet, useLocation, useMatches} from "react-router-dom";
import {
    BookOutlined,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";
import {useMemo, useState} from "react";
import type {RouteHandler} from "./route.ts";

export function AppLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation();
    const matches = useMatches();

    const headerTitle = useMemo(() => {
        for (let i = matches.length - 1; i >= 0; i--) {
            const handle = matches[i].handle as RouteHandler | undefined
            if (handle?.title) {
                return handle.title
            }
        }

        return "Vago"
    }, [matches])

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
                        {key: "/login", icon: <LoginOutlined/>, label: <Link to="/login">Войти</Link>},
                        {type: "divider" as const},
                        {key: "/logout", icon: <LogoutOutlined/>, label: <Link to="/logout">Выйти</Link>},
                    ]}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: "0 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                >
                    <Space>
                        <Button
                            type="text"
                            onClick={() => setCollapsed((v) => !v)}
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        />
                        <Typography.Text strong>{headerTitle}</Typography.Text>
                    </Space>

                    <Space>
                        <Button>Помощь</Button>
                        <Button type="primary"
                                onClick={() =>{
                                    window.location.href = "/";
                                }}
                        >
                            Портал Golang
                        </Button>
                    </Space>
                </Header>

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