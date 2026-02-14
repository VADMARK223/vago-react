import { ScrollableContainer } from '@/shared/ui';
import type { MessageResponse } from '@/shared/types.ts';
import { useMessages } from '@/features/admin/admin.ts';
import { DeleteMessageBtn } from '@/features/admin/messages/DeleteMessageBtn.tsx';

export const MessagesTab = () => {
  const { data, isLoading, isError } = useMessages();

  const users: MessageResponse[] = data?.messages ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (!users.length) {
    return <div>Сообщений нет</div>;
  }

  return (
    <ScrollableContainer>
      <div className="stack">
        {users.map((message: MessageResponse) => (
          <div className="panel" key={message.id}>
            <div>
              <h3>ID: {message.id}</h3>
              <div>
                Username: {message.username} (Id: {message.authorId})
              </div>
              <div>
                Body: <b>{message.body}</b>
              </div>
              <div>Type: {message.type}</div>
              <div>Sent at: {message.sentAt}</div>
            </div>

            <DeleteMessageBtn id={message.id} />
          </div>
        ))}
      </div>
    </ScrollableContainer>
  );
};
