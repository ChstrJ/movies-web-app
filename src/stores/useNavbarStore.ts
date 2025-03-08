import { create } from 'zustand';

type navbarState = {
    navLink: string,
    setNavLink: (link: string) => void,
}

export const useNavbarStore = create<navbarState>((set) => ({
    navLink: '/movies',
    setNavLink: (link) => set({ navLink: link }),
}));