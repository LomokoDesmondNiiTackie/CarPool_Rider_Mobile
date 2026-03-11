import { create } from "zustand";


interface QrState {
    token: string;
    openQr: boolean;

    setToken: (value: string) => void;
    setOpenQr: (value: boolean ) => void;
};

export const useQrState = create<QrState>((set)=> ({
    token: "carpool-rider-qr-code-data",
    openQr: false,
    setToken: (value: string) => set({ token: value}),
    setOpenQr: (value: boolean) => set({openQr: value})
}))