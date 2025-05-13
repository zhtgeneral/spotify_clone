import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * This function returns all the liked songs of the current user.
 * 
 * It returns no songs if the user is not logged in,
 * or if there is an error in fetching from Supabase.
 */
export default async function getLikedSongs(): Promise<Song[]> {
	const supabase = createServerComponentClient({ cookies: cookies });
	const { data: { session } } = await supabase.auth.getSession();

	if (!session) {
		return [];
	}

	const { data, error } = await supabase
		.from("liked_songs")
		.select("*, songs(*)")
		.eq("user_id", session?.user?.id)
		.order("created_at", { ascending: false });

	if (error) {
		console.log("getLikedSongs error: " + error.message);
		return [];
	}

	if (!data) {
		return [];
	}

	return data.map((item) => ({
		...item.songs,
	}));
};
