"use client";

import { Song } from "@/types";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import MediaItem from "@/components/MediaItem";
import useAuthModal from "@/hooks/modals/useAuthModal";
import useUploadModal from "@/hooks/modals/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import React from "react";
import useSubscribeModal from "@/hooks/modals/useSubscribeModal";

interface LibraryProps {
	songs: Song[]
}

	
/**
 * This component renders the songs that the user has created.
 * 
 * It renders a `+` button that lets the user add songs.
 * If the user is not logged in, it opens the Auth modal and prompts the user to login.
 * 
 * Otherwise it opens the Upload modal to let the user add a song.
 */
const Library: React.FC<LibraryProps> = ({ 
	songs
}) => {
	const authModal = useAuthModal();
	const uploadModal = useUploadModal();
	const subscribeModal = useSubscribeModal()
	const { user, subscription } = useUser();


	const onPlay = useOnPlay(songs);

	const onClick = () => {
		if (!user) {
			return authModal.onOpen();
		}
		if (!subscription) {
			return subscribeModal.onOpen();
		}
		return uploadModal.onOpen();
	};

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between px-5 py-4">
				<div className="inline-flex items-center gap-x-2">
					<TbPlaylist className="text-neutral-400" size={26} />
					<p className="text-neutral-400 font-medium text-md">Your library</p>
				</div>
				<AiOutlinePlus
					onClick={onClick}
					size={20}
					className="text-neutral-400 cursor-pointer hover:text-white transition"
					id="upload-song"
				/>
			</div>
			<div className="flex flex-col gap-y-2 mt-4 px-3" id="library-songs">
				{songs.map((item: Song) => (
					<MediaItem
						onClick={(id: string) => onPlay(id)}
						key={item.id}
						data={item}
					/>
				))}
			</div>
		</div>
	);
};
export default Library;
