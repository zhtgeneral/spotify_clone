"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

/**
  Component that when clicked on, puts a like on the song for the current user.

	Renders a heart icon that is filled when song is liked and otherwise outline.

	When clicked on, it checks if the user if logged in. If not, it opens up the login modal.
	Otherwise it adds the song into the user's liked playlist.

	If the song is liked and clicked again, it removes the like from the database.

  @param songId id of the song that gets liked
  @returns 
 */
const LikeButton = ({ songId }: { songId: string }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();

	const authmodal = useAuthModal();
	const { user } = useUser();
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (!user?.id) return;
		const fetchData = async () => {
			const { data, error } = await supabaseClient
				.from("liked_songs")
				.select("*")
				.eq("user_id", user.id)
				.eq("song_id", songId)
				.single();
			if (!error && data) setIsLiked(true);
		};
		fetchData();
	}, [songId, supabaseClient, user?.id]);

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

	const handleLike = async () => {
		if (!user) authmodal.onOpen();
		if (isLiked) {
			const { error } = await supabaseClient
				.from("liked_songs")
				.delete()
				.eq("user_id", user?.id)
				.eq("song_id", songId);
			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(false);
			}
		} else {
			const { error } = await supabaseClient
				.from("liked_songs")
				.insert({ song_id: songId, user_id: user?.id });
			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(true);
				toast.success("Song liked");
			}
		}
		router.refresh();
	};

	return (
		<button onClick={handleLike} className="hover:opacity-75 transition">
			<Icon color={isLiked ? "#22c55e" : "white"} size={25} />
		</button>
	);
};

export default LikeButton;
