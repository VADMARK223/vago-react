import { create } from 'zustand';

export type OnlineUser = {
  userId: number;
  username: string;
};

type ChatStore = {
  onlineUsers: OnlineUser[];
  setSnapshot: (users: OnlineUser[]) => void;
  userJoined: (user: OnlineUser) => void;
  userLeft: (userId: number) => void;

  draft: string;
  setDraft: (v: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  onlineUsers: [],
  setSnapshot: (users) =>
    set(() => ({
      onlineUsers: users,
    })),

  userJoined: (user) =>
    set((state) => {
      if (state.onlineUsers.some((u) => u.userId === user.userId)) {
        return state;
      }
      return { onlineUsers: [...state.onlineUsers, user] };
    }),

  userLeft: (userId) =>
    set((state) => ({
      onlineUsers: state.onlineUsers.filter((u) => u.userId !== userId),
    })),

  draft: '',
  setDraft: (v) => set({ draft: v }),
}));
