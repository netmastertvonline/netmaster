"use client"

import { create } from "zustand"
import { WhatsApp } from "@prisma/client";

type WhatsAppType = {
    data?: WhatsApp | null;
    isOpen: boolean;
    onOpen: (data?: WhatsApp) => void;
    onClose: () => void;
}

export const useWhatsAppProvider = create<WhatsAppType>((set) => ({
    data: undefined,
    isOpen: false,
    onOpen: (data?: WhatsApp | null) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: undefined })
}))