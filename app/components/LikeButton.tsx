"use client";

import { useUser } from '@/app/hooks/useUser';
import useAuthModal from '@/app/hooks/modals/useAuthModal';

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Debug {
	isLiked: boolean
}

interface LikeButtonProps {
	songId: string,
	debug?: Debug
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
 * 
 * @requires user needs to be logged in. 
 * @requires SupabaseProvider needs to be around this component.
 * @requires UserProvider needs to be around this component.
 * @requires RouterContext needs to be around this component.
 */
export default function LikeButton({ 
	songId,
	debug
}: LikeButtonProps) {
	const { user } = useUser();
	const router = useRouter();
	const supabaseClient = useSupabaseClient()
	const authmodal = useAuthModal();
	
	const [isLiked, setIsLiked] = useState(false);
	
	React.useEffect(() => {		
		fetchData();
	}, [songId, supabaseClient, user, user?.id]);

	async function fetchData() {
		if (user && user.id) {
			const { data, error } = await supabaseClient
			.from("liked_songs")
			.select("*")
			.eq("user_id", user.id)
			.eq("song_id", songId)
			.maybeSingle();

			if (!error && data) {
				setIsLiked(true);
			}
		}
	}

	async function handleLike() {
		if (!user) {
			authmodal.onOpen();
			return;
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

	let songLiked = isLiked;
	if (debug) {
		songLiked = debug.isLiked;
	}
	const Icon = songLiked ? AiFillHeart : AiOutlineHeart;
	return (
		<button 
			onClick={handleLike} 
			className="hover:opacity-75 transition"
		>
			<Icon 	
				className={isLiked? "text-main" : "text-white"}
				size={25} 
			/>
		</button>
	);
};