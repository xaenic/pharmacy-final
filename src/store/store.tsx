// store.js
import { create } from "zustand";

interface ModalState {
  active: boolean;
  shown: string | null;
  setModal: any;
}

const useModalStore = create<ModalState>((set) => ({
  active: false,
  shown: null,
  setModal: (newValues: Partial<ModalState>) =>
    set((state) => ({ ...state, ...newValues })),
}));

export default useModalStore;
