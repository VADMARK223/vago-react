import {App, Button} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {api} from '../../shared/api/kyClient.ts'
import {CODE} from '../../constants/codes.ts'
import {QUERY_KEY} from '../../constants/queryKeys.ts'

export function SignOutButton() {
    const {message} = App.useApp()
    const qc = useQueryClient()
    const {refetch} = useQuery({
        queryKey: [QUERY_KEY.SIGN_OUT],
        queryFn: () => api.get(CODE.SIGN_OUT),
        enabled: false,
    })

    return <Button icon={<LogoutOutlined/>} onClick={() => {
        refetch().then(() => {
            message.info('Успешный выход.').then()
            qc.invalidateQueries({queryKey: [QUERY_KEY.ME]}).then()
        })
    }}>Выйти</Button>
}
