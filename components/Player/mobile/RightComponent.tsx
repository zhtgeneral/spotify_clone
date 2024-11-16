import { IconType } from "react-icons";

interface MobileRightComponent {
  handlePlay: () => void;
  icon: IconType
}

/**
 * This component is the playbutton for mobile devices.
 * 
 * It has a play/pause button that plays/stops the song playing.
 */
const MobileRightComponent: React.FC<MobileRightComponent> = ({
  handlePlay,
  icon: Icon
}) => {
  return (
    <div
      onClick={handlePlay}
      className="flex md:hidden col-auto w-full justify-end items-center"
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
        <Icon 
          size={30} 
          className="text-black" 
        />
      </div>
    </div>
  )
}
export default MobileRightComponent;