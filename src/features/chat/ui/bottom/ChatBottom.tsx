import { type InputRef } from 'antd';
import { type RefObject, useEffect, useRef } from 'react';
import { ChatInput } from '@/features/chat/ui/bottom/ChatInput';
import { SendButton } from '@/features/chat/ui/bottom/SendButton';
import styles from '../../ChatPage.module.css';
import { useChatStore } from '@/features/chat/model/chat.store';

type Props = {
  isConnected: boolean;
  wsRef: RefObject<WebSocket | null>;
};

type MessageRequest = {
  type: string;
  text: string;
};

export const ChatBottom = ({ isConnected, wsRef }: Props) => {
  const draft = useChatStore((s) => s.draft);
  const setDraft = useChatStore((s) => s.setDraft);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    inputRef.current?.focus();
  }, [isConnected]);

  const send = () => {
    const text = draft.trim();
    if (!text) {
      setDraft('');
      return;
    }

    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error('WS not valid');
      return;
    }

    const payload: MessageRequest = { type: 'message', text };
    ws.send(JSON.stringify(payload));

    setDraft('');
  };

  return (
    <div className={styles.bottomWrapper}>
      <ChatInput
        onSend={send}
        onChange={setDraft}
        disabled={!isConnected}
        input={draft}
        inputRef={inputRef}
      />
      <SendButton onSend={send} disabled={!draft.trim() || !isConnected} />
    </div>
  );
};
