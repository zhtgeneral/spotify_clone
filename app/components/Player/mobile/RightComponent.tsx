import { IconType } from "react-icons";

interface MobileRightComponent {
  togglePlay: () => void;
  icon: IconType
}

/**
 * This component is the playbutton for mobile devices.
 * 
 * It has a play/pause button that plays/stops the song playing.
 */
export default function MobileRightComponent({
  togglePlay,
  icon: Icon
}: MobileRightComponent) {
  return (
    <div
      onClick={togglePlay}
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