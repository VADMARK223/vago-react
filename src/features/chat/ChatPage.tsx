import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { Button, Input, type InputRef } from 'antd';
import { Virtuoso } from 'react-virtuoso';
import { SendOutlined } from '@ant-design/icons';
import type { MessageResponse } from '@/shared/types.ts';
import clsx from 'clsx';

const WS_URL = 'ws://localhost:5555/ws';

// На сервер
type MessageRequest = {
  type: string;
  text: string;
};

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : '';
}

export const ChatPage = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<InputRef>(null);
  const sendBtnRef = useRef<HTMLButtonElement | null>(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const token = useMemo(() => getCookie('vago_token'), []);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    const el = inputRef.current;
    if (el) {
      el.focus();
    }
  }, [isConnected]);

  useEffect(() => {
    const wsUrl = `${WS_URL}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const dto = JSON.parse(event.data);
        setMessages((prev) => [...prev, dto]);
      } catch {
        throw Error('Could not parse message');
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [token]);

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
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <div className={styles.connection}>
            <span
              className={clsx(styles.dot, {
                [styles.online]: isConnected,
                [styles.offline]: !isConnected,
              })}
            />
            <span className={styles.label}>
              {isConnected ? `Connected: (${WS_URL})` : 'Disconnected'}
            </span>
          </div>
          <div id="messagesDiv" ref={messagesRef} className={styles.messages}>
            <Virtuoso
              data={messages}
              followOutput="auto"
              itemContent={(_, message) => (
                <div key={message.id} className={styles.message}>
                  {message.username} : <b>{message.body}</b>
                </div>
              )}
            />
          </div>

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
              ref={sendBtnRef}
              icon={<SendOutlined />}
              onClick={handleSend}
              disabled={!input.trim() || !isConnected}
            />
          </div>
        </div>
      </div>
    </>
  );
};
