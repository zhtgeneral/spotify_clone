import { Song } from "@/app/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "@/app/actions/getSongs";


/**
 * This function gets all the songs given the title from Supabase.
 * 
 * It returns the songs ordered by most recently created.
 * 
 * It returns all songs if the title is not specified.
 */
export default async function getSongsByTitle(title: string): Promise<Song[]> {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});
	if (!title) {
		const allSongs = await getSongs();
		return allSongs;
	}

	const { data, error } = await supabase
		.from("songs")
		.select("*")
		.ilike("title", `%${title}%`)
		.order("created_at", { ascending: false });

	if (error) {
		console.log(`getSongsByTitle title ${title} error: ` + error.message);
	}

	return data || [];
}

