"use client";

import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";
import { Song } from "@/types";
import React from "react";

interface SongItemProps {
	onClick: (id: string) => void;
	song: Song
}

/**
 * This component renders the song thumbnail in a rounded square icon.
 *
 * It renders the play button when hovered over. 
 * 
 * If thumbnail is missing, renders the liked image icon instead.
 *
 * It calls `onClick` when the thumbnail is clicked on.
 *
 * @param onclick with `onClick: (id: string) => void` and `data: Song`
 */
const SongItem: React.FC<SongItemProps> = ({
	song,
	onClick
}) => {
	const imagePath = useLoadImage(song);
	return (
		<div
			onClick={() => onClick(song.id)}
			id="song-item"
			className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
		>
			<div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
				<Image
					className="object-cover"
					src={imagePath || "/images/liked.png"}
					fill
					alt="Image"
					sizes="1000"
				/>
			</div>
			<div className="flex flex-col items-start w-full py-4 gap-y-1">
				<p className="font-semibold truncate w-full">
					{song.title}
				</p>
				<p className="text-neutral-400 text-sm pb-4 w-full truncate">
					By {song.author}
				</p>
			</div>
			<div className="absolute bottom-24 right-5">
				<PlayButton />
			</div>
		</div>
	);
};

export default SongItem;
