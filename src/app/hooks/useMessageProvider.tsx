"use client"

import { create } from "zustand"
import { Message } from "../types/message";

type MessageType = {
    message?: Message | null;
    isOpen: boolean;
    onOpen: (message?: Message) => void;
    onClose: () => void;
}

export const useMessageProvider = create<MessageType>((set) => ({
    message: undefined,
    isOpen: false,
    onOpen: (message?: Message | null) => set({ isOpen: true, message }),
    onClose: () => set({ isOpen: false, message: undefined })
}))