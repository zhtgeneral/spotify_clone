"use client";

import usePlayer from '@/app/hooks/usePlayer';
import useLoadImage from '@/app/hooks/useLoadImage';

import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
	onClick?: (id: string) => void;
	data: Song;
}

/**
 * This component renders the image of a song.
 * 
 * It starts the player when the item is clicked on.
 * 
 * @requires SupabaseContext needs to be around this component.
 */
export default function MediaItem({
	onClick,
	data,
}: MediaItemProps) {
	const player = usePlayer();
	const imageUrl = useLoadImage(data);

	function handleClick() {
		if (onClick) {
			return onClick(data.id);
		}
		return player.setId(data.id);
	};

	return (
		<div
			onClick={handleClick}
			className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
			id="media-items"
		>
			<div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
				<Image
					fill
					src={imageUrl || "/images/liked.png"}
					alt="Media item"
					className="object-cover"
					sizes="1000"
				/>
			</div>
			<div className="flex flex-col gap-y-1 overflow-hidden">
				<p className="text-white truncate">
					{data.title}
				</p>
				<p className="text-neutral-400 text-sm truncate">
					{data.author}
				</p>
			</div>
		</div>
	);
};