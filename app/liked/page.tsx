import getLikedSongs from "@/actions/getLikedSongs";
import LikedController from "./components/LikedController";


/** This is used to disable caching */
export const revalidate = 0;

/**
 * This component handles liking songs and renders liked songs
 */
export default async function LikedServer() {
	const songs = await getLikedSongs();
	return (
		<LikedController 
			songs={songs} 
		/>
	)
};