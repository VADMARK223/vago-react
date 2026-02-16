import { ScrollableContainer } from '@/shared/ui';
import { DeleteMessageButton } from '@/features/admin/messages/DeleteMessageButton';
import { useMessages } from '@/shared/api/messages/use-messages';
import { DeleteAllMessagesButton } from '@/features/admin/messages/DeleteAllMessagesButton';

export const MessagesTab = () => {
  const { data: messages, isLoading, isError } = useMessages();

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
    <div
      style={{
        width: '100%',
        // background: 'gray',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '8px',
        }}
      >
        <div>Всего: {messages.length}</div>
        <DeleteAllMessagesButton />
      </div>

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

              <DeleteMessageButton id={message.id} />
            </div>
          ))}
        </div>
      </ScrollableContainer>
    </div>
  );
};
