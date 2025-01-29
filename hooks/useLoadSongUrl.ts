import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * This hook gets the songs url of the song from Supabase. 
 * 
 * If there is no song, it return an empty string.
 */
const useLoadSongUrl = (song: Song | undefined) => {
	if (!song) {
		return "";
	}
	const supabaseClient = useSupabaseClient();
	const { data } = supabaseClient.storage.from("songs").getPublicUrl(song.song_path);
	return data.publicUrl;
};

export default useLoadSongUrl;
