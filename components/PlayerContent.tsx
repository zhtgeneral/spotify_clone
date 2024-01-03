'use client'

import { Song } from "@/types"
import MediaItem from "@/components/MediaItem"
import LikeButton from "@/components/LikeButton"
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import Slider from "@/components/Slider"
import usePlayer from "@/hooks/usePlayer"
import { useState } from "react"

const PlayerContent = ({
  song,
  songUrl
}: {
  song: Song,
  songUrl: string
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1]
    if (!nextSong) return player.setId(player.ids[0]);
    else player.setId(nextSong);
  }

  const onPlayPrev = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1]
    if (!prevSong) return player.setId(player.ids[player.ids.length - 1]);
    else player.setId(prevSong);
  }

  const Icon = isPlaying? BsPauseFill: BsPlayFill
  const VolumeIcon = (volume === 0)? HiSpeakerXMark : HiSpeakerWave
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
      <div className='flex w-full justify-start'>
        <div className='flex items-center gap-x-4'>
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      {/* below is for mobile view */}
      <div className='flex md:hidden col-auto w-full justify-end items-center'>
        <div onClick={() => {}} className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'>
          <Icon size={30} className='text-black' />
        </div>
      </div>
      {/* below is desktop view */}
      <div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
        <AiFillStepBackward size={30} onClick={onPlayPrev} className='text-neutral-400 cursor-pointer hover:text-white transition' />
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'>
          <Icon size={30} className='text-black' />
        </div>
        <AiFillStepForward size={30} onClick={onPlayNext} className='text-neutral-400 cursor-pointer hover:text-white transition' />
      </div>
      <div className='hidden md:flex w-full justify-end pr-2'>
        <div className='flex items-center gap-x-2 w-[120px]'>
          <VolumeIcon size={34} onClick={() => {}} className='cursor-pointer' />
          <Slider />
        </div>
      </div>
    </div>
    
  )
}

export default PlayerContent