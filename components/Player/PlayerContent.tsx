"use client";

import { Song } from "@/types";
import useSoundController from "@/hooks/useSoundController"

import { useState } from "react";;
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import CenterComponent from "@/components/Player/desktop/CenterComponent";
import RightComponent from "./desktop/RightComponent";
import MobileRightComponent from "./mobile/RightComponent";
import LeftComponentProps from './LeftComponent';

interface PlayerContentProps {
	song: Song,
	songUrl : string
}

/**
 * This component handles playing songs.
 * 
 * It renders buttons to move to the previous and next song.
 * 
 * It renders a volume slider and a mute button.
 */
const PlayerContent: React.FC<PlayerContentProps> = ({ 
	song, 
	songUrl 
}) => {
	const [volume, setVolume] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const {
		onPlayNext,
    onPlayPrev,
    play,
    pause
	} = useSoundController(songUrl, volume, setIsPlaying);

	function handlePlay() {
		if (!isPlaying) {
			play();
		} else {
			pause();
		}
	}
	const Icon = isPlaying ? BsPauseFill : BsPlayFill;
	
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 h-full">
			<LeftComponentProps song={song} />
			<MobileRightComponent 
				handlePlay={handlePlay}
				icon={Icon}
			/>
			<CenterComponent 
				onPlayPrev={onPlayPrev}
				handlePlay={handlePlay}
				onPlayNext={onPlayNext}
				icon={Icon}
			/>
			<RightComponent 
				volume={volume}
				setVolume={setVolume}
			/>
		</div>
	);
};
export default PlayerContent;
