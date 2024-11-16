import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * This function gets all the songs from Supabase.
 * 
 * It returns the songs ordered by most recently created.
 */
export default async function getSongs(): Promise<Song[]> {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});
	const { data, error } = await supabase
		.from("songs")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) {
		console.log("getSongs error: " + error);
	}
	return data || [];
};
