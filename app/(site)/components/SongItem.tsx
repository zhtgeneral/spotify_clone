"use client";

import PlayButton from "@/app/components/PlayButton";
import useLoadImage from "@/app/hooks/useLoadImage";
import { Song } from "@/app/types/types";
import Image from "next/image";

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
export default function SongItem({
	song,
	onClick
}: SongItemProps) {
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
