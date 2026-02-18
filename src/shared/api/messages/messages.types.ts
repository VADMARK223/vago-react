import type { Id } from '@/shared/types';
// import type { ChatOutbound } from '@/features/chat/model/chat.ws.protocol';

// type WSMessageType = 'message.send' | 'message.new' | 'error' | 'typing';

export type MessageDTO = {
  id: Id;
  authorId: number;
  body: string;
  sentAt: string;
  type: string; // тип сообщения (text, image и т.п.)
  username: string;
};

export type ErrorPayload = {
  message: string;
};

export type UiMessage = MessageDTO & {
  isMine: boolean;
};

export type MessagesQueryData = {
  messages: MessageDTO[];
};
