import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UiState = {
  sidebarOpen: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: false,

      showSidebar: () => set({ sidebarOpen: true }),
      hideSidebar: () => set({ sidebarOpen: false }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'vago-ui-store',
    },
  ),
);
