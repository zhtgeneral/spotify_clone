import { useUser } from '@/app/hooks/useUser';
import { Song } from "@/types";
import usePlayer from '@/app/hooks/usePlayer';
import useAuthModal from '@/app/hooks/modals/useAuthModal';

/**
 * This hook gives global access to the sound player's active status.
 * 
 * If the user is not logged in, it opens the AuthModal and prompts the user to login.
 * 
 * Otherwise it stores the `ids` of each of the songs in global state.
 * 
 * It returns a function that allows the client to set the current active song.
 */
export default function useOnPlay(songs: Song[]) {
	const player = usePlayer();
	const authModal = useAuthModal();
	const { user } = useUser();

	function onPlay(id: string) {
		if (!user) {
			return authModal.onOpen();
		}
		player.setId(id);
		player.setIds(songs.map((song: Song) => song.id));
	};
	return onPlay;
};