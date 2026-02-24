import { ScrollableContainer } from '@/shared/ui';
import { DeleteMessageButton } from '@/features/message/delete/DeleteMessageButton';
import { useMessages } from '@/shared/api/messages/use-messages';
import { DeleteAllMessagesButton } from '@/features/message/delete-all/DeleteAllMessagesButton';

export const MessagesTab = () => {
  const { data: messages } = useMessages();

  return (
    <div className="pageWithScroll">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '8px',
          flex: '0 0 auto',
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
