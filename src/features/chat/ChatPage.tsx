import { useEffect, useRef, useState } from 'react';
import styles from './ChatPage.module.css';
import { Button, Input } from 'antd';
import { Virtuoso } from 'react-virtuoso';
import { SendOutlined } from '@ant-design/icons';

type Message = {
  id: string;
  text: string;
};

export const ChatPage = () => {
  const statusRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const sendBtnRef = useRef<HTMLButtonElement | null>(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const statusEl = statusRef.current;
    const messagesEl = messagesRef.current;

    if (!statusEl || !messagesEl) {
      return;
    }

    statusEl.textContent = 'Test layout...';
  }, []);

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    const newMessage: Message = {
      id: crypto.randomUUID(), // норм способ для фронта
      text: message,
    };

    setMessages((prevState) => [...prevState, newMessage]);
    setMessage('');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <div id="status" ref={statusRef} className={styles.status} />
          <div id="messagesDiv" ref={messagesRef} className={styles.messages}>
            <Virtuoso
              data={messages}
              followOutput="auto"
              itemContent={(_, message) => (
                <div key={message.id} className={styles.message}>
                  {message.text}
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
              placeholder="Сообщение"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSend}
            ></Input>
            <Button type="primary" ref={sendBtnRef} icon={<SendOutlined />} onClick={handleSend} />
          </div>
        </div>
      </div>
    </>
  );
};
