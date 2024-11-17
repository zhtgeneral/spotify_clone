import { IconType } from "react-icons";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";


interface CenterProps {
  onPlayPrev: () => void;
  handlePlay: () => void;
  onPlayNext: () => void;
  icon: IconType
}

/**
 * This component handles the play button for desktop views.
 * 
 * It renders a prev/next button with a play/pause button.
 */
const CenterComponent: React.FC<CenterProps> = ({
  onPlayPrev,
  handlePlay,
  onPlayNext,
  icon: Icon
}) => {
  const size = 30;
  return (
    <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
      <AiFillStepBackward
        size={size}
        onClick={onPlayPrev}
        className="text-neutral-400 cursor-pointer hover:text-white transition"
      />
      <div
        className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        onClick={handlePlay}
      >
        <Icon size={size} className="text-black" />
      </div>
      <AiFillStepForward
        size={size}
        onClick={onPlayNext}
        className="text-neutral-400 cursor-pointer hover:text-white transition"
      />
    </div>
  )
}
export default CenterComponent