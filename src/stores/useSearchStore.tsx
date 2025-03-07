import { create } from 'zustand';

type searchState = {
  searchInput: string,
  userInput: string,
  setSearchInput: (input: string) => void
  setUserInput: (input: string) => void
}

export const useSearchStore = create<searchState>((set) => ({
  searchInput: "",
  userInput: "",
  setSearchInput: (input) => set({ searchInput: input }),
  setUserInput: (input) => set({ userInput: input })
}));




