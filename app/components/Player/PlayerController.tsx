"use client";

import PlayerPresenter from "@/app/components/Player/PlayerPresenter";
import useGetSongById from "@/app/hooks/useGetSongById";
import useLoadSongUrl from "@/app/hooks/useLoadSongUrl";
import usePlayerState from "@/app/hooks/usePlayer";
import useSoundController from "@/app/hooks/useSoundController";
import React from "react";

const debugging = true;

/**
 * This component handles the control of the player.
 * 
 * If there is no song, songUrl or it is not active, it doesn't show the player.
 * 
 * Otherwise it passes relevant info to the presenter
 */
export default function PlayerController() {
	 const playerState = usePlayerState();

	 const { song } = useGetSongById(playerState.activeId);
	 const songUrl = useLoadSongUrl(song);
	 
	 const [volume, setVolume] = React.useState(1);
	 const [isPlaying, setIsPlaying] = React.useState(false);

	 if (debugging) {
		console.log(`PlayerController::songUrl: ${songUrl}`);
	 }

	 const changeVolume = React.useCallback((value: number) => {
		 setVolume(value);
	 }, []);
 
	 const soundController = useSoundController(songUrl, volume, setIsPlaying);
 
	 const togglePlay = React.useCallback(() => {
		 if (isPlaying) {
			 soundController.onPause();
			 setIsPlaying(false);
		 } else {
			 soundController.onPlay();
			 setIsPlaying(true);
		 }
	 }, [isPlaying]);


	 const isActive = Boolean(playerState.activeId);  

	 if (!song || !songUrl || !isActive) {
		if (debugging) {
			console.log("PlayerPresenter not displaying")
		}
		return null;
	}

	return (
		<PlayerPresenter 
			key={songUrl} 
			song={song} 
			volume={volume}
			isPlaying={isPlaying}
			onPlayNext={soundController.onPlayNext}
    	onPlayPrev={soundController.onPlayPrev}
			togglePlay={togglePlay}
			changeVolume={changeVolume}
		/>
	);
};