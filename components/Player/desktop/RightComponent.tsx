import Slider from "@/components/Player/Slider";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

interface RightComponentProps {
  volume: number,
  changeVolume: (value: number) => void;
}

/**
 * This is the right subcomponent that handles changes and volume mutes.
 */
export default function RightComponent({
  volume,
  changeVolume
}: RightComponentProps) {
  function toggleMute() {
    volume == 0? changeVolume(1) : changeVolume(0);
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
          onChange={changeVolume} 
        />
      </div>
    </div>
  )
}