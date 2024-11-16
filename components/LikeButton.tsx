"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
	songId: string
}

/**
 * This component puts a like on the song for the current user.
 * 
 * If the user is not logged in, it opens the Auth modal 
 * and prompts the user to log in.
 * 
 * It renders a filled heart icon if liked.
 * Otherwise it renders an outline heart icon.
 * 
 * On like status change, it displays a message to the user.
 */
const LikeButton: React.FC<LikeButtonProps> = ({ 
	songId
}) => {
	const [isLiked, setIsLiked] = useState(false);

	const router = useRouter();
	const supabaseClient = useSupabaseClient()
	const authmodal = useAuthModal();
	const { user } = useUser();

	useEffect(() => {
		if (!user || !user?.id) {
			return;
		}
		async function fetchData() {
			const { data, error } = await supabaseClient
				.from("liked_songs")
				.select("*")
				.eq("user_id", user?.id)
				.eq("song_id", songId)
				.maybeSingle();
			if (!error && data) {
				setIsLiked(true);
			}
		};
		fetchData();
	}, [songId, supabaseClient, user, user?.id]);

	async function handleLike() {
		if (!user) {
			authmodal.onOpen();
		}
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
				.insert({ 
					song_id: songId, 
					user_id: user?.id 
				});
			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(true);
				toast.success("Song liked");
			}
		}
		router.refresh();
	};

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
	return (
		<button 
			onClick={handleLike} 
			className="hover:opacity-75 transition"
		>
			<Icon 	
				color={isLiked ? "#22c55e" : "white"} 
				size={25} 
			/>
		</button>
	);
};

export default LikeButton;
