"use client";

import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";
import { Song } from "@/types";

/**
 * Renders song image in a rounded square icon.
 *
 * Renders the play button when hovered over. If image is missing, renders the heart icon.
 *
 * When clicked on, passes the song id into onClick
 *
 * @param param Object with ```onClick: (id: string) => void``` and ```data: Song```
 * @returns ```JSX.Element```
 */
const SongItem = ({
	onClick,
	data,
}: {
	onClick: (id: string) => void;
	data: Song;
}) => {
	const imagePath = useLoadImage(data);
	return (
		<div
			onClick={() => onClick(data.id)}
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
			<div className="flex flex-col items-start w-full p-4 gap-y-1">
				<p className="font-semibold truncate w-full">{data.title}</p>
				<p className="text-neutral-400 text-sm pb-4 w-full truncate">
					By {data.author}
				</p>
			</div>
			<div className="absolute bottom-24 right-5">
				<PlayButton />
			</div>
		</div>
	);
};

export default SongItem;
