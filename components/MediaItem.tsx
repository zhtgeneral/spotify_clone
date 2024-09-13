"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
/**
	Component that renders the icon of a media item

	Renders the image of a song and when clicked on, sets the global state song.

	Renders rounded border of dark gray. When hovered over, 
	displays the play button and the background color lightens.

  @param onClick passes the song into onClick
	@param data song
  @returns JSX.Element
 */
const MediaItem = ({
	onClick,
	data,
}: {
	onClick?: (id: string) => void;
	data: Song;
}) => {
	const imageUrl = useLoadImage(data);
	const handleClick = () => {
		if (onClick) return onClick(data.id);
		// should turn on player
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
				<p className="text-white truncate">{data.title}</p>
				<p className="text-neutral-400 text-sm truncate">{data.author}</p>
			</div>
		</div>
	);
};

export default MediaItem;
