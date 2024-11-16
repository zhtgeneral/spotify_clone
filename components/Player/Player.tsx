"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "@/components/Player/PlayerContent";

/**
 * This component handles rendering the player.
 * 
 * If there is no song, song url, or active id on the player,
 * it doesn't displayer the player.
 * 
 * Otherwise it displays the song player.
 */
const Player = () => {
	const player = usePlayer();
	const { song } = useGetSongById(player.activeId);

	const songUrl = useLoadSongUrl(song!);
	if (!song || !songUrl || !player.activeId) {
		return null;
	}
	return (
		<div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
			<PlayerContent 
				key={songUrl} 
				song={song} 
				songUrl={songUrl} 
			/>
		</div>
	);
};

export default Player;
