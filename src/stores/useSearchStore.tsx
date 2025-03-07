import { create } from 'zustand';

type searchState = {
  searchInput: string,
  setSearchInput: (input: string) => void
}

export const useSearchStore = create<searchState>((set) => ({
  searchInput: "",
  setSearchInput: (input) => set({ searchInput: input })
}));




