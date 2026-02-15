import { ScrollableContainer } from '@/shared/ui';
import { DeleteMessageBtn } from '@/features/admin/messages/DeleteMessageBtn';
import { useMessages } from '@/shared/api/messages/use-messages';

export const MessagesTab = () => {
  const { data, isLoading, isError } = useMessages();

  const messages = data?.messages ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  if (!messages.length) {
    return <div>Сообщений нет</div>;
  }

  return (
    <ScrollableContainer>
      <div className="stack">
        {messages.map((message) => (
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
