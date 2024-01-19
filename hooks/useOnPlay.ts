import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

/**
 * returns a function that plays sets the song ids
 * @requires user be logged in
 * @param songs Song[]
 * @returns (id: string) => void
 */
const useOnPlay = (songs: Song[]) => {
  const player    = usePlayer();
  const authModal = useAuthModal();
  const { user }  = useUser();

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();
    player.setId(id);
    player.setIds(songs.map((song: Song) => song.id))
  }

  return onPlay;
}

export default useOnPlay;