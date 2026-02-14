import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminTabsKey } from '@/shared/types.ts';

type UiState = {
  sidebarOpen: boolean;
  adminTabKey: AdminTabsKey;

  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;

  setAdminTabKey: (key: AdminTabsKey) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      adminTabKey: 'users',

      showSidebar: () => set({ sidebarOpen: true }),
      hideSidebar: () => set({ sidebarOpen: false }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setAdminTabKey: (key) => set({ adminTabKey: key }),
    }),
    {
      name: 'vago-ui-store',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        adminTabKey: state.adminTabKey,
      }),
    },
  ),
);
