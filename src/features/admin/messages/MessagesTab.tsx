import { ScrollableContainer } from '@/shared/ui';
import { DeleteMessageButton } from '@/features/message/delete/DeleteMessageButton';
import { VStack } from '@/shared/ui/v-stack/VStack';
import { MessagesToolbar } from '@/features/admin/messages/MessagesToolbar';
import { Empty, Pagination } from 'antd';
import { useMemo, useState } from 'react';
import { useMessages } from '@/shared/api/messages/use-messages';
import ruRU from 'antd/locale/ru_RU';

const PAGE_SIZE = 10;
const paginationLocale = {
  ...ruRU.Pagination,
  items_per_page: '/ на странице',
};

export const MessagesTab = () => {
  const { data: messages } = useMessages();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return messages.slice(start, start + pageSize);
  }, [messages, page, pageSize]);

  return (
    <div className="pageWithScroll">
      <MessagesToolbar messages={messages} />
      <ScrollableContainer>
        <VStack>
          {pageItems.length !== 0 ? (
            pageItems.map((message) => (
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
            ))
          ) : (
            <Empty description="Сообщений пока нет" />
          )}
        </VStack>
      </ScrollableContainer>
      {!!messages.length && (
        <Pagination
          style={{ marginTop: 8 }}
          current={page}
          pageSize={pageSize}
          total={messages.length}
          locale={paginationLocale}
          showSizeChanger
          showTotal={(total, range) => `${range[0]}–${range[1]} из ${total}`}
          onChange={(nextPage, nextSize) => {
            setPage(nextPage);
            setPageSize(nextSize);
          }}
        />
      )}
    </div>
  );
};
