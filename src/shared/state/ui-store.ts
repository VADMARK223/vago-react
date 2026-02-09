import { create } from 'zustand';

type UiState = {
  sidebarOpen: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,

  showSidebar: () => set({ sidebarOpen: true }),
  hideSidebar: () => set({ sidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
