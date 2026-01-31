import {Button, message} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "../../shared/api/kyClient.ts";
import {CODES} from "../../constants/codes.ts";

export function SignOutButton() {
    const qc = useQueryClient()
    const {refetch} = useQuery({
        queryKey: [CODES.SIGN_OUT],
        queryFn: () => api.get(CODES.SIGN_OUT),
        enabled: false,
    })

    return <Button icon={<LogoutOutlined/>} onClick={() => {
        refetch().then(() => {
            message.info("Успешный выход.").then()
            qc.invalidateQueries({queryKey: ["me"]}).then()
        })
    }}>Выйти</Button>
}
