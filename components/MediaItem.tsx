"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

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
