import {Button, message} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "../../shared/api/kyClient.ts";

export function LogoutButton() {
    const qc = useQueryClient()
    const {refetch} = useQuery({
        queryKey:["logout"],
        queryFn: ()=>api.get("logout"),
        enabled: false,
    })

    return <Button icon={<LogoutOutlined/>} onClick={() => {
        refetch().then(()=>{
            message.info("Успешный выход.").then()
            qc.invalidateQueries({queryKey: ["me"]}).then()
        })
    }}>Выйти</Button>
}
