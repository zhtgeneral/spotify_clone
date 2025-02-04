"use client"

import { SearchPresenter } from '@/app/search/components/SearchPresenter';
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

interface SearchControllerProps {
  songs: Song[]
}

/**
 * This component handles searching songs.
 * 
 * @requires title is on searchParams
 */
export default function SearchController({  
  songs
}: SearchControllerProps) {
  const { user } = useUser();
  return (
    <SearchPresenter 
      songs={songs} 
      user={user}
    />
  )
};