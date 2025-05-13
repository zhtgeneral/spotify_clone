"use client";

import LikeButton from "@/app/components/LikeButton";
import MediaItem from "@/app/components/MediaItem";
import useOnPlay from "@/app/hooks/useOnPlay";
import { Song } from "@/types";

interface LikedContentProps {
	songs: Song[],
}

/**
 * This component shows the liked songs of the user.
 */
export default function LikedContent({ 
	songs,
}: LikedContentProps) {
	const onPlay = useOnPlay(songs);	

	if (songs.length === 0) {
		return (
			<div className="flex flex-col gap-y-2 w-full px-6 pb-6 text-neutral-400 pr-1">
				No liked songs
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-y-2 w-full p-6">
			{songs.map((item: any) => (
				<div
					key={item.id}
					className="flex items-center gap-x-4 w-full"
					id="liked-songs"
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