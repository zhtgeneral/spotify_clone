import { create } from "zustand";

interface UploadModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

/**
 * This hook gives global access to a upload modal's open state
 */
const useUploadModal = create<UploadModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
