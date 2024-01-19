import { Song } from "@/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * Fetches Song url from Supabase
 * @param song Song
 * @returns string
 */
const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) return '';

  const { data: songData } = supabaseClient.storage.from('songs').getPublicUrl(song.song_path)
  return songData.publicUrl;
}

export default useLoadSongUrl