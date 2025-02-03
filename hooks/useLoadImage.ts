import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
/**
 * This hook returns the url of an image from Supabase.
 * 
 * @requires SupabaseContext is around this component.
 */
const useLoadImage = (song: Song) => {
	const supabaseClient = useSupabaseClient();
	const { data } = supabaseClient.storage.from("images").getPublicUrl(song.image_path);
	return data.publicUrl;
};

export default useLoadImage;
