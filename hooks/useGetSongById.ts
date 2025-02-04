import { Song } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import toast from "react-hot-toast";

/**
 * This hook returns memo of song containing isLoading and the song
 * @param id optional string
 */
export default function useGetSongById(songId?: string) {
	const supabaseClient = useSupabaseClient();

	const [isLoading, setIsLoading] = React.useState(false);
	const [song, setSong] = React.useState<Song | undefined>(undefined);

	React.useEffect(() => {
		if (!songId) {
			return;
		}
		setIsLoading(true);
		async function fetchSong() {
			const { data, error } = await supabaseClient.from("songs").select("*").eq("id", songId).single();
			if (error) {
				setIsLoading(false);
				return toast.error(error.message);
			}
			setSong(data);
			setIsLoading(false);
		};
		fetchSong();
	}, [songId, supabaseClient]);

	return React.useMemo(
		() => ({
			isLoading,
			song,
		}),
		[isLoading, song]
	);
};