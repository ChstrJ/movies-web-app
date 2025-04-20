import { SearchResult } from '@/lib/types';
import { create } from 'zustand';

type generalStore = {
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
  selectedResult: SearchResult | null;
  setSelectedResult: (result: SearchResult) => void;
};

export const useGeneralStore = create<generalStore>(set => ({
  documentTitle: 'BingeHub',
  setDocumentTitle: title => set({ documentTitle: title }),
  selectedResult: null,
  setSelectedResult: result => set({ selectedResult: result }),
}));
