import { Song } from "@/types";

import { useEffect, useMemo, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

/**
 * This hook returns memo of song containing isLoading and the song
 * @param id optional string
 */
const useGetSongById = (id?: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [song, setSong] = useState<Song | undefined>(undefined);
	const supabaseClient = useSupabaseClient();

	useEffect(() => {
		if (!id) {
			return;
		}
		setIsLoading(true);
		async function fetchSong() {
			const { data, error } = await supabaseClient.from("songs").select("*").eq("id", id).single();
			if (error) {
				setIsLoading(false);
				return toast.error(error.message);
			}
			setSong(data);
			setIsLoading(false);
		};
		fetchSong();
	}, [id, supabaseClient]);

	return useMemo(
		() => ({
			isLoading,
			song,
		}),
		[isLoading, song]
	);
};

export default useGetSongById;
