import { useUsers } from '../admin';
import { DeleteUserButton } from './DeleteUserButton';
import { ScrollableContainer } from '@/shared/ui';

export function UsersTab() {
  const { data, isLoading, isError } = useUsers();

  const users = data?.users ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (!users.length) {
    return <div>No users found</div>;
  }

  return (
    <div className="pageWithScroll">
      <div>
        Кол-во пользователей: <b>{users.length}</b>
      </div>
      <ScrollableContainer>
        <div className="stack">
          {users.map((user) => (
            <div className="panel" key={user.id}>
              <div>
                <h2>ID: {user.id}</h2>
                <span>Username: {user.username}</span>
                <br />
                <span>Login: {user.login}</span>
                <br />
                <span>Role: {user.role}</span>
              </div>

              <DeleteUserButton id={user.id} />
            </div>
          ))}
        </div>
      </ScrollableContainer>
    </div>
  );
}
