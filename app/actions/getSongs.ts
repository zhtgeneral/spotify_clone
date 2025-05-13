import { Song } from "@/app/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * This function gets all the songs from Supabase.
 * 
 * It checks if the user is logged in using Supabase Auth and cookies.
 * 
 * If the user is not logged in, 
 * the song select operation will fails due to RLS in Supabase.
 * If so, print the error and return empty array of songs.
 * 
 * Otherwise if the user is logged in, 
 * return the data from songs in descending order (newest first).
 * 
 * It returns the songs ordered by most recently created.
 */
export default async function getSongs(): Promise<Song[]> {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});
	const { data, error } 
	= await supabase
		.from("songs")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.log("getSongs error: " + error);
		return [];
	}
	return data;
}
