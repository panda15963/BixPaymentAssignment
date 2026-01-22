import { create } from 'zustand';
import type { NavItem } from '../components/header/types'; // 경로 확인

interface NavState {
    currentNav: string;
    navItems: NavItem[];
    isMobileOpen: boolean;
    userProfile: { name: string; avatar: string } | null;
    setCurrentNav: (nav: string) => void;
    toggleMobile: () => void;
    setUserProfile: (profile: NavState['userProfile']) => void;
}

export const useNavStore = create<NavState>((set) => ({
    currentNav: 'Dashboard',
    navItems: [],
    isMobileOpen: false,
    userProfile: null,
    setCurrentNav: (nav) => set({ currentNav: nav }),
    toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
    setUserProfile: (profile) => set({ userProfile: profile }),
}));