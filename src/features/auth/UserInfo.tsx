import {useMe} from "./auth.ts";
import {Button, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {LoginOutlined} from "@ant-design/icons";
import {SignOutButton} from "./SignOutButton.tsx";
import {ROUTES} from "../../constants/routes.ts";

export function UserInfo() {
    const {data: user, isLoading, error} = useMe()
    const navigate = useNavigate();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <Space orientation={"horizontal"}>
        <p>Привет, Гость!</p>
        <Button icon={<LoginOutlined/>} onClick={() => navigate(ROUTES.SIGN_IN)}>Войти</Button>
    </Space>;

    return <Space orientation={"horizontal"}>
        <p>Привет, {user?.username}!</p>
        <SignOutButton/>
    </Space>
}