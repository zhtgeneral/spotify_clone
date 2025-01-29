import usePlayerState from "@/hooks/usePlayer";
import { Howl } from 'howler';
import React from "react";
import { useEffect } from "react";

export default function useSoundController(
  songUrl: string,
  volume: number,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
) {
  const playerState = usePlayerState();
  const soundRef = React.useRef<Howl | null>(null);

  React.useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [songUrl],
      html5: true,
      volume: volume,
      format: ['mp3'],
      onplay: () => {
        console.log('useSoundController::onplay', { songUrl });
        setIsPlaying(true);
      },
      onend: () => {
        console.log('useSoundController::onend');
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => {
        console.log('useSoundController::onpause');
        setIsPlaying(false);
      },
      onstop: () => {
        console.log('useSoundController::onstop');
        setIsPlaying(false);
      },
      onloaderror: (_, error) => {
        console.error('useSoundController::onloaderror:', error);
        setIsPlaying(false);
      },
      onplayerror: (_, error) => {
        console.error('useSoundController::onplayerror:', error);
        setIsPlaying(false);
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [songUrl]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  function onPlayNext() {
    if (playerState.ids.length === 0) return;
    
    const currentIndex = playerState.ids.findIndex((id) => id === playerState.activeId);
    const nextSong = playerState.ids[currentIndex + 1];
    
    if (!nextSong) {
      playerState.setId(playerState.ids[0]);
    } else {
      playerState.setId(nextSong);
    }
  }

  function onPlayPrev() {
    if (playerState.ids.length === 0) return;
    
    const currentIndex = playerState.ids.findIndex((id) => id === playerState.activeId);
    const prevSong = playerState.ids[currentIndex - 1];
    
    if (!prevSong) {
      playerState.setId(playerState.ids[playerState.ids.length - 1]);
    } else {
      playerState.setId(prevSong);
    }
  }

  function onPlay() {
    try {
      if (soundRef.current && !soundRef.current.playing()) {
        soundRef.current.play();
      }
    } catch (error) {
      console.error('Play error:', error);
      setIsPlaying(false);
    }
  }

  function onPause() {
    try {
      if (soundRef.current && soundRef.current.playing()) {
        soundRef.current.pause();
      }
    } catch (error) {
      console.error('Pause error:', error);
      setIsPlaying(false);
    }
  }

  return {
    onPlayNext,
    onPlayPrev,
    onPlay,
    onPause
  };
}