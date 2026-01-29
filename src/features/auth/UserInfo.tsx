import {useMe} from "./auth.ts";
import {Button, Space} from "antd";
import {LoginOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

export function UserInfo() {
    const {data: user, isLoading, error} = useMe()
    const navigate = useNavigate();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <Space orientation={"horizontal"}>
        <p>Привет, Гость!</p>
        <Button icon={<LoginOutlined/>} onClick={() => navigate("/login")}>Войти</Button>
    </Space>;

    return <div>Привет, {user?.username}!</div>;
}