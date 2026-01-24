import { create } from 'zustand';

interface NavState {
    currentNav: string;
    isMobileOpen: boolean;
    setCurrentNav: (nav: string) => void;
    toggleMobile: () => void;
}

export const useNavStore = create<NavState>((set) => ({
    currentNav: 'Dashboard',
    isMobileOpen: false,
    setCurrentNav: (nav) => set({ currentNav: nav }),
    toggleMobile: () =>
        set((state) => ({ isMobileOpen: !state.isMobileOpen })),
}));