"use client"

import { Redirect } from "@prisma/client";
import { create } from "zustand"

type RedirectType = {
    data?: Redirect | null;
    isOpen: boolean;
    onOpen: (data?: Redirect) => void;
    onClose: () => void;
}

export const useRedirectProvider = create<RedirectType>((set) => ({
    data: undefined,
    isOpen: false,
    onOpen: (data?: Redirect | null) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: undefined })
}))