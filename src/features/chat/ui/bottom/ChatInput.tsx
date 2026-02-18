import TextArea from 'antd/es/input/TextArea';
import type { RefObject } from 'react';
import type { InputRef } from 'antd';

type Props = {
  onSend: () => void;
  onChange: (val: string) => void;
  disabled: boolean;
  input: string;
  inputRef: RefObject<InputRef | null>;
};

export const ChatInput = ({ onSend, disabled, input, onChange, inputRef }: Props) => {
  return (
    <TextArea
      ref={inputRef}
      placeholder="Сообщение"
      disabled={!disabled}
      value={input}
      autoSize={{ minRows: 1, maxRows: 6 }}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        // Enter отправляет, Shift+Enter перенос строки
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
      }}
    />
  );
};
