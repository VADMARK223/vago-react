import { type InputRef } from 'antd';
import { type RefObject, useEffect, useRef, useState } from 'react';
import { ChatInput } from '@/features/chat/bottom/ChatInput';
import { SendButton } from '@/features/chat/bottom/SendButton';
import styles from '../ChatPage.module.css';

type Props = {
  isConnected: boolean;
  wsRef: RefObject<WebSocket | null>;
};

type MessageRequest = {
  type: string;
  text: string;
};

export const ChatBottom = ({ isConnected, wsRef }: Props) => {
  const [value, setValue] = useState<string>(''); // Строка введенного сообщения
  const inputRef = useRef<InputRef>(null);

  // Автоматическая фокусировка на поле ввода
  useEffect(() => {
    if (!isConnected) {
      return;
    }

    inputRef.current?.focus();
  }, [isConnected]);

  const send = () => {
    const text = value.trim();
    if (!text) {
      setValue('');
      return;
    }

    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error('WS not valid');
      return;
    }

    const payload: MessageRequest = { type: 'message', text };
    ws.send(JSON.stringify(payload));

    setValue('');
  };

  return (
    <div className={styles.bottomWrapper}>
      <ChatInput
        onSend={send}
        onChange={setValue}
        disabled={isConnected}
        input={value}
        inputRef={inputRef}
      />
      <SendButton onSend={send} disabled={!value.trim() || !isConnected} />
    </div>
  );
};
