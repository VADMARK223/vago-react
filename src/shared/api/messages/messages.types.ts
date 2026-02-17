import type { Id } from '@/shared/types';

export type MessageResponse = {
  id: Id;
  authorId: number;
  body: string;
  sentAt: string;
  type: string;
  username: string;
};

export type UiMessage = MessageResponse & {
  isMine: boolean;
};
