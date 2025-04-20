import { create } from 'zustand';

type searchState = {
  searchInput: string,
  userInput: string,
  setSearchInput: (input: string) => void
  setUserInput: (input: string) => void
  resultsDropdown: boolean
  setResultsDropdown: (value: boolean) => void
}

export const useSearchStore = create<searchState>((set) => ({
  searchInput: "",
  userInput: "",
  setSearchInput: (input) => set({ searchInput: input }),
  setUserInput: (input) => set({ userInput: input }),
  resultsDropdown: false,
  setResultsDropdown: (value) => set({ resultsDropdown: value, userInput: "" }),
}));




