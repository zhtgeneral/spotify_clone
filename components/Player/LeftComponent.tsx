import { Song } from "@/types"
import LikeButton from "../LikeButton"
import MediaItem from "../MediaItem"

interface LeftComponentProps {
  song: Song
}

/**
 * This component is the left subcomponent of the song player.
 * 
 * It renders a small media item with the like button.
 */
const LeftComponent: React.FC<LeftComponentProps> = ({
  song
}) => {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-center gap-x-4">
        <MediaItem data={song} />
        <LikeButton songId={song.id} />
      </div>
    </div>
  )
}
export default LeftComponent