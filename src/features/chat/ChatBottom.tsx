import { Button, Input, type InputRef } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { type RefObject, useEffect, useRef, useState } from 'react';

type Props = {
  isConnected: boolean;
  wsRef: RefObject<WebSocket | null>;
};

type MessageRequest = {
  type: string;
  text: string;
};

export const ChatBottom = ({ isConnected, wsRef }: Props) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    const el = inputRef.current;
    if (el) {
      el.focus();
    }
  }, [isConnected]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) {
      setInput('');
      return;
    }

    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error('WS not valid');
      return;
    }

    const newMessage: MessageRequest = {
      text: input,
      type: 'message',
    };

    ws.send(JSON.stringify(newMessage));

    setInput('');
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        width: '100%',
      }}
    >
      <Input
        ref={inputRef}
        placeholder="Сообщение"
        disabled={!isConnected}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={handleSend}
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={handleSend}
        disabled={!input.trim() || !isConnected}
      />
    </div>
  );
};
