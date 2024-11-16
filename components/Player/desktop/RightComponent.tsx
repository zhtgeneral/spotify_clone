import Slider from "@/components/Player/Slider";
import { Dispatch, SetStateAction } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

interface RightComponentProps {
  volume: number,
  setVolume: Dispatch<SetStateAction<number>>
}

/**
 * This is the right subcomponent that handles changes and volume mutes.
 */
const RightComponent: React.FC<RightComponentProps> = ({
  volume,
  setVolume,
}) => {
  function toggleMute() {
		if (volume === 0) {
			setVolume(1);
		} else {
			setVolume(0)
		}
	}
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  return (
    <div className="hidden md:flex w-full justify-end pr-2">
      <div className="flex items-center gap-x-2 w-[120px]">
        <VolumeIcon
          size={34}
          onClick={toggleMute}
          className="cursor-pointer"
        />
        <Slider 
          value={volume} 
          onChange={(value) => setVolume(value)} 
        />
      </div>
    </div>
  )
}
export default RightComponent