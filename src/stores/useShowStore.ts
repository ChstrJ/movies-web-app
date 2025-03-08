import { create } from 'zustand';

type showStore = {
    showPage: number,
    setShowPage: (page: number) => void
}

export const useShowStore = create<showStore>(set => ({
    showPage: 5,
    setShowPage: (value) => set({ showPage: value })
}));