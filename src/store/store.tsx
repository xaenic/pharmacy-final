// store.js
import { create } from "zustand";

interface ModalState {
  active: boolean;
  shown: string | null;
  id: string | null;
  name: string | null;
  setModal: any;
}

export const useModalStore = create<ModalState>((set) => ({
  active: false,
  shown: null,
  id: null,
  name: null,
  setModal: (newValues: Partial<ModalState>) =>
    set((state) => ({ ...state, ...newValues })),
}));

export interface SidebarState {
  active: boolean;
  setSidebar: any;
}

export const useSidebar = create<SidebarState>((set) => ({
  active: false,
  setSidebar: (newValues: Partial<SidebarState>) =>
    set((state) => ({ ...state, ...newValues })),
}));

export interface SearchState {
  term: string;
  setTerm: any;
}

export const useSearch = create<SearchState>((set) => ({
  term: "",
  setTerm: (newValues: Partial<SearchState>) =>
    set((state) => ({ ...state, ...newValues })),
}));
