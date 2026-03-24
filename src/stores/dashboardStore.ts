import { create } from 'zustand';

interface DashboardState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  currentStoreId: string | null;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setCurrentStoreId: (id: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: false,
  currentStoreId: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebarCollapsed: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCurrentStoreId: (id) => set({ currentStoreId: id }),
}));
