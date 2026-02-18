import type { MessageResponse } from '@/shared/api/messages/messages.types';
import { create } from 'zustand';
import type { Id } from '@/shared/types';

type ChatStore = {
  liveMessages: MessageResponse[];
  addLiveMessage: (m: MessageResponse) => void;
  removeLiveMessage: (id: Id) => void;
  clearLiveMessages: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  liveMessages: [],
  addLiveMessage: (m) => set((s) => ({ liveMessages: [...s.liveMessages, m] })),
  removeLiveMessage: (id) =>
    set((s) => ({ liveMessages: s.liveMessages.filter((x) => x.id !== id) })),
  clearLiveMessages: () => set(() => ({ liveMessages: [] })),
}));
