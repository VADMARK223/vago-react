import {DeleteOutlined} from '@ant-design/icons'
import {App, Button} from 'antd'
import {useDeleteUser} from '../admin.ts'
import type {JSX} from 'react'
import {getKyErrorMessage} from '../../../shared/api/kyClient.ts'

interface DeleteUserButtonProps {
    id: number
}

export function DeleteUserButton({id}: DeleteUserButtonProps): JSX.Element {
    const {message} = App.useApp()
    const {mutate: deleteUser, isPending} = useDeleteUser()

    return <Button
        type={'primary'}
        onClick={() => {
            deleteUser(id, {
                onSuccess: async (response)=>{
                    message.success(response.message)
                },
                onError: async (err)=>{

                    const errorMsg = await getKyErrorMessage(err)
                    message.error(errorMsg)
                }
            })
        }}
        danger
        loading={isPending}
        size={'large'}
        icon={<DeleteOutlined/>}/>
}
