
import usePlayer from "@/hooks/usePlayer";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useSound from "use-sound";
import { Howl } from 'howler';

type SoundControllerType = {
  sound: Howl | null;
  pause: (id?: string) => void;
  stop: (id?: string) => void;
  duration: number | null;
};

const useSoundController = (
  songUrl: string,
  volume: number,
  setIsPlaying: Dispatch<SetStateAction<boolean>>
) => {
  const player = usePlayer();
  const soundRef = useRef<SoundControllerType | undefined>();

  function onPlayNext() {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    } else {
      player.setId(nextSong);
    }
  }

  function onPlayPrev() {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];
    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    } else {
      player.setId(prevSong);
    }
  }

  const [play, { sound, pause, stop, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"]
  });

  useEffect(() => {
    soundRef.current = { sound, pause, stop, duration };
  }, [sound, pause, stop, duration]);

  useEffect(() => {
    sound?.volume(volume);
  }, [volume, sound]);

  useEffect(() => {
    function cleanup() {
      soundRef.current?.stop();
      soundRef.current?.sound?.unload();
    }
    return cleanup;
  }, [songUrl]);

  return {
    onPlayNext,
    onPlayPrev,
    play,
    pause
  };
};

export default useSoundController;