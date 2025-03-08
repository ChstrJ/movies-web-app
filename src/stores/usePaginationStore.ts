import { create } from 'zustand';

type PaginationState = {
    page: number;
    setPage: (value: number) => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
    page: 5,
    setPage: (value) => set({ page: value }),
}));
