import { create } from "zustand";

interface PlayerStore {
	ids: string[];
	activeId?: string;
	setId: (id: string) => void;
	setIds: (ids: string[]) => void;
	reset: () => void;
}

/**
 * This hook gives global access to the sound player's status.
 * 
 * The user player holds the `ids` of all the songs and `activeId`
 */
const usePlayerState = create<PlayerStore>((set) => ({
	ids: [],
	activeId: undefined,
	setId: (id: string) => set({ activeId: id }),
	setIds: (ids: string[]) => set({ ids: ids }),
	reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayerState;
