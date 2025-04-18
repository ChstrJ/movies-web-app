import { create } from 'zustand';

type generalStore = {
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
};

export const useGeneralStore = create<generalStore>(set => ({
  documentTitle: 'BingeHub',
  setDocumentTitle: title => set({ documentTitle: title }),
}));
