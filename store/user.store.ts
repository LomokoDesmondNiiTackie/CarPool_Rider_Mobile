import { create } from "zustand";

interface UserState {
    fullname: string;
    email: string;
    phone: string;
    pickup: string;
    dropoff: string;
    balance: number;

    setFullName: (value:string) => void;
    setEmail: (value:string) => void;
    setPhone: (value:string) => void;
    setPickUp: (value:string) => void;
    setDropOff: (value:string) => void;
    setBalance: (value:number) => void;

}

export const useUserStore = create<UserState>((set) => ({
    fullname: "Lomoko Desmond",
    email: "lomokodesmond@gmail.com",
    phone: "0548341442",
    pickup: "Flat Top",
    dropoff: "Christian Village Bus stop",
    balance: 0,

    setFullName: (value: string) => set({fullname: value}),
    setEmail: (value: string) => set({email: value}),
    setPhone: (value: string) => set({phone: value}),
    setPickUp: (value: string) => set({pickup: value}),
    setDropOff: (value: string) => set({dropoff: value}),
    setBalance: (value: number) => set({balance: value})
}));