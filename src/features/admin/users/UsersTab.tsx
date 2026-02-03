import {useUsers} from '../admin.ts'
import {DeleteUserButton} from './DeleteUserButton.tsx'

export function UsersTab() {
    const {data, isLoading, isError} = useUsers()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

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

                    <DeleteUserButton id={user.id}/>
                </div>
            ))}
        </div>
    )
}
