import { useCallback, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { useMessages } from '@/shared/api/messages/use-messages';
import { ChatBottom } from '@/features/chat/ui/bottom/ChatBottom';
import { ChatTop } from '@/features/chat/ui/top/ChatTop';

import { ChatMiddle } from '@/features/chat/ui/middle/ChatMiddle';
import { getCookie, getWsUrl } from '@/features/chat/model/chat.ws.protocol';
import { useMe } from '@/features/auth/auth';
import { useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useChatStore } from '@/features/chat/model/chat.store';
import { useChatWs } from '@/features/chat/use-chat-ws';
import { buildChatListItems, type UiMessage } from '@/features/chat/chat-page';

export const ChatPage = () => {
  const { message } = App.useApp();
  const wsUrl = getWsUrl();
  const token = getCookie('vago_token');

  const setSnapshot = useChatStore((s) => s.setSnapshot);
  const onlineUsers = useChatStore((s) => s.onlineUsers);
  const userJoined = useChatStore((s) => s.userJoined);
  const userLeft = useChatStore((s) => s.userLeft);

  const qc = useQueryClient();
  const { data: me } = useMe();
  const myId = me?.id;
  const { data: messages } = useMessages();

  const atBottomRef = useRef(true);
  const [atBottom, setAtBottom] = useState(true);
  const [unread, setUnread] = useState(0);

  const incUnread = useCallback(() => setUnread((n) => n + 1), []);

  const handleBottomChange = (val: boolean) => {
    atBottomRef.current = val;
    setAtBottom(val);

    if (val) {
      setUnread(0);
    }
  };

  const { wsRef, isConnected } = useChatWs({
    wsUrl,
    token,
    qc,
    messageApi: message,
    atBottomRef,
    incUnread,
    setSnapshot,
    userJoined,
    userLeft,
  });

  const items = buildChatListItems(
    messages.map((m): UiMessage => ({ ...m, isMine: myId === m.authorId })),
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <ChatTop wsUrl={wsUrl} onlineUsers={onlineUsers} isConnected={isConnected} />
          <ChatMiddle
            messages={items}
            atBottom={atBottom}
            unread={unread}
            onAtBottomChange={handleBottomChange}
          />
          <ChatBottom isConnected={isConnected} wsRef={wsRef} />
        </div>
      </div>
    </>
  );
};
