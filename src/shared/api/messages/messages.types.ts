import type { Id } from '@/shared/types';

export type MessageResponse = {
  id: Id;
  authorId: string;
  body: string;
  sentAt: string;
  type: string;
  username: string;
};
