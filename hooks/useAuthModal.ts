import { create } from "zustand";

interface AuthModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

/**
 * This hook gives global access to a upload modal's open state
 */
const useAuthModal = create<AuthModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
