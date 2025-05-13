"use client";

import { Song } from "@/app/types/types";
import SongItem from '@/app/(site)/components/SongItem';

interface PageContentProps {
	songs: Song[],
	onPlay: (id: string) => void
}

/**
 * This component shows all the songs by most recently added.
 * 
 * If there are no songs, it displays a message that no songs are available.
 * 
 * For 2xl screens it displays songs in a grid of 8 x h.
 * 
 * For xl screens it displays songs in a grid of 5 x h.
 * 
 * For lg screens it displays songs in a grid of 4 x h.
 * 
 * For sm and md screens it displays songs in a grid of 3 x h.
 * 
 * For smaller screens, it displays songs in a grid of 2 x h.
 */
export default function PageContent({ 
	songs,
	onPlay
}: PageContentProps) {
	if (songs.length === 0) {
		return (
			<div>
				No Songs available.
			</div>
		)
	}
	return (
		<div
			className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
			id="newest-songs"
		>
			{songs.map((item) => (
				<SongItem
					key={item.id}
					onClick={(id: string) => onPlay(id)}
					song={item}
				/>
			))}
		</div>
	);
};
