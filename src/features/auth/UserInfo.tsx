import {useMe} from "./auth.ts";
import {Button, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {LoginOutlined} from "@ant-design/icons";
import {LogoutButton} from "./LogoutButton.tsx";

export function UserInfo() {
    const {data: user, isLoading, error} = useMe()
    const navigate = useNavigate();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <Space orientation={"horizontal"}>
        <p>Привет, Гость!</p>
        <Button icon={<LoginOutlined/>} onClick={() => navigate("/login")}>Войти</Button>
    </Space>;

    return <Space orientation={"horizontal"}>
        <p>Привет, {user?.username}!</p>
        <LogoutButton/>
    </Space>
}