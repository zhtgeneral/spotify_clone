import { create } from "zustand";

interface SubscribeModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

/**
 * This hook gives global access to a subscribe modal's open state
 */
const useSubscribeModal = create<SubscribeModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useSubscribeModal;
