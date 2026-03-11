import { create } from "zustand";

interface userRide {
    rideType: string;
    pickup: string;
    dropoff: string;
    fee: number;

    setRideType: (value: string) => void;
    setPickup: (value: string) => void;
    setDropoff: (value: string) => void;
    setFee: (value: number) => void;
};

export const useRideStore = create<userRide>((set)=> ({
    rideType: "",
    pickup: "",
    dropoff: "",
    fee: 12,

    setRideType: (value: string) => set({rideType: value}),
    setPickup: (value: string) => set({pickup: value}),
    setDropoff: (value: string) => set({dropoff: value}),
    setFee: (value: number) => set({fee: value})
}))