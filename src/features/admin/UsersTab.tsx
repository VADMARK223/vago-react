import {useUsers} from './admin.ts';
import {Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

export function UsersTab() {
    const {data, isLoading, isError} = useUsers()

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <div className="stack">
            {data?.data.users.map((user) => (
                <div className={'panel'} key={user.id}>
                    <div>
                        <h2>ID: {user.id}</h2>
                        <span>Username: {user.username}</span><br/>
                        <span>Login: {user.login}</span><br/>
                        <span>Role: {user.role}</span>
                    </div>

                    <Button type={'primary'} danger size={'large'} icon={<DeleteOutlined/>}/>
                </div>
            ))}
        </div>
    )
}
