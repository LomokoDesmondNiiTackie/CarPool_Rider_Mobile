import { create } from "zustand";

interface WalletState {
  showTopUp: boolean;
  showSuccess: boolean;
  openTopUp: () => void;
  closeTopUp: () => void;
  setShowSuccess: (value: boolean) => void;

}

export const useWalletStore = create<WalletState>((set) => ({
  showTopUp: false,
  showSuccess: false,
  openTopUp: () => set({ showTopUp: true }),
  closeTopUp: () => set({ showTopUp: false }),
  setShowSuccess: (value: boolean) => set({ showSuccess: value})
}));