import getLikedSongs from "@/actions/getLikedSongs";
import LikedPresenter from "./components/LikedPresenter";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React from "react";


/** This is used to disable caching */
export const revalidate = 0;

/**
 * This component handles liking songs and renders liked songs
 */
export default async function LikedController() {
	const { isLoading, user } = useUser();
	const router = useRouter();
	const songs = await getLikedSongs();

	React.useEffect(() => {
		if (!isLoading && !user) {
			router.replace("/");
		}
	}, [isLoading, user, router]);

	return (
		<LikedPresenter 
			songs={songs} 
			user={user}
		/>
	)
};