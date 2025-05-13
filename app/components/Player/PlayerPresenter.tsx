"use client";

import { Song } from "@/types";

import CenterComponent from "@/app/components/Player/desktop/CenterComponent";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import RightComponent from "./desktop/RightComponent";
import LeftComponentProps from './LeftComponent';
import MobileRightComponent from "./mobile/RightComponent";

interface PlayerPresenterProps {
	song: Song,
	volume: number,
	isPlaying: boolean,
	onPlayNext: () => void,
	togglePlay: () => void,
	onPlayPrev: () => void,
	changeVolume: (value: number) => void;
}

/**
 * This component handles rendering the player and playing songs.
 * 
 * It renders buttons to move to the previous and next song.
 * 
 * It renders a volume slider and a mute button.
 */
export default function PlayerPresenter({ 
	song, 
	volume,
	isPlaying,
	onPlayNext,
	togglePlay,
	onPlayPrev,
	changeVolume
}: PlayerPresenterProps) {	
	const Icon = isPlaying ? BsPauseFill : BsPlayFill;
	return (
		<div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
			<div className="grid grid-cols-2 md:grid-cols-3 h-full">
				<LeftComponentProps 
					song={song} 
				/>
				<MobileRightComponent 
					togglePlay={togglePlay}
					icon={Icon}
				/>
				<CenterComponent 
					onPlayPrev={onPlayPrev}
					togglePlay={togglePlay}
					onPlayNext={onPlayNext}
					icon={Icon}
				/>
				<RightComponent 
					volume={volume}
					changeVolume={changeVolume}
				/>
			</div>
		</div>
	);
};
