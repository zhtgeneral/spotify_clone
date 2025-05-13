import { Song } from "@/app/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const debugging = true;

/** 
 * This function gets all the songs created by the current user.
 * 
 * It returns the songs ordered by most recently created.
 * 
 * It returns no songs is the user is not logged in.
 */
export default async function getSongsByUserId(): Promise<Song[]> {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});
	const { 
		data: sessionData, 
		error: sessionError 
	} = await supabase.auth.getSession();

	if (!sessionData.session || sessionError) {
		if (debugging) {
			console.log("getSongsByUserId::sessionError: " + sessionError);
		}
		return [];
	}

	const { data, error } = await supabase
		.from("songs")
		.select("*")
		.eq("user_id", sessionData.session?.user.id)
		.order("created_at", { ascending: false });

	if (error) {
		console.log("getSongsByUserId error: " + error.message);
	}

	return data || [];
};
