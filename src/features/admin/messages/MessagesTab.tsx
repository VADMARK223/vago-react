import { ScrollableContainer } from '@/shared/ui';
import { DeleteMessageButton } from '@/features/admin/messages/DeleteMessageButton';
import { useMessages } from '@/shared/api/messages/use-messages';
import { DeleteAllMessagesButton } from '@/features/admin/messages/DeleteAllMessagesButton';
import { App } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import { QUERY_KEY, URL } from '@/shared/constants';

export const MessagesTab = () => {
  const { data: messages, isLoading, isError } = useMessages();

  const { message } = App.useApp();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return api.delete(`${URL.MESSAGES}`).json<ApiMessageResponse>();
    },
    onSuccess: () => {
      message.success('Все сообщения удалены').then();
      qc.invalidateQueries({ queryKey: [QUERY_KEY.messages] }).then();
    },
    onError: () => {
      message.error('Error deleting messages').then();
    },
  });

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
        <DeleteAllMessagesButton
          clearFn={() => {
            mutation.mutate();
          }}
          disable={messages.length === 0}
        />
      </div>

      {messages.length !== 0 ? (
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
      ) : (
        <div>Сообщений нет</div>
      )}
    </div>
  );
};
