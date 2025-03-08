import { create } from 'zustand';

type Genre = {
    id: number;
    name?: string;
}

type GenreState = {
    genres: Genre[];
    setGenres: (genres: Genre[]) => void;
}

export const useGenreStore = create<GenreState>((set) => ({
    genres: [],
    setGenres: (genres) => set({ genres })
}));