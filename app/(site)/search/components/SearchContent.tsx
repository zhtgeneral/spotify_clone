"use client";

import LikeButton from "@/app/components/LikeButton";
import MediaItem from "@/app/components/MediaItem";
import useOnPlay from "@/app/hooks/useOnPlay";
import { Song } from "@/app/types/types";

interface SearchContentProps {
	songs: Song[]
}

/**
 * This component handles searching songs
 */
export default function SearchContent({ 
	songs
}: SearchContentProps) {
	const onPlay = useOnPlay(songs);
	if (songs.length === 0) {
		return (
			<div className="flex flex-col gap-y-2 w-full px-6 pb-6 text-neutral-400">
				No Songs Found
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-y-2 w-full px-6">
			{songs.map((item: Song) => (
				<div
					key={item.id}
					className="flex items-center gap-x-4 w-full"
					id="searched-songs"
				>
					<div className="flex-1">
						<MediaItem 
							onClick={(id: string) => onPlay(id)} 
							data={item} 
						/>
					</div>
					<LikeButton songId={item.id} />
				</div>
			))}
		</div>
	);
};