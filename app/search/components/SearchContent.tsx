'use client'

import { Song } from "@/types"
import MediaItem from "../../../components/MediaItem"
import LikeButton from "@/components/LikeButton"

const SearchContent = ({
  songs,
}: {
  songs: Song[]
}) => {
  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>No Songs Found</div>
    )
  }
  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
      {songs.map((item: Song) => (
        <div key={item.id} className='flex items-center gap-x-4 w-full'>
          <div className='flex-1'>
            <MediaItem onClick={() => {}} data={item} />
          </div>
          <LikeButton songId={item.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent