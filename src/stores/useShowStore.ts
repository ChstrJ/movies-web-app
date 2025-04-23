import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type showStore = {
    showPage: number;
    setShowPage: (page: number) => void;
    selectedSeason: number;
    setSelectedSeason: (season: number) => void;
    selectedEpisode: number;
    setSelectedEpisode: (episode: number) => void;

}

export const useShowStore = create<showStore>()(
    persist(
        (set => ({
            showPage: 5,
            setShowPage: (value) => set({ showPage: value }),
            selectedSeason: 1,
            setSelectedSeason: season => set({ selectedSeason: season }),
            selectedEpisode: 1,
            setSelectedEpisode: episode => set({ selectedEpisode: episode })
        })),
        {
            name: 'series'
        }
    )
);
