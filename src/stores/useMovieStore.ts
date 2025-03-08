import { create } from 'zustand';

type movieStore = {
    moviePage: number,
    setMoviePage: (page: number) => void
}

export const useMovieStore = create<movieStore>(set => ({
    moviePage: 5,
    setMoviePage: (value) => set({ moviePage: value })
}));