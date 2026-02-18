import { create } from 'zustand';

type ChatStore = {
  draft: string;
  setDraft: (v: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  draft: '',
  setDraft: (v) => set({ draft: v }),
}));
