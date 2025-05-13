"use client"

import { useUser } from "@/app/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import LikedPresenter from '@/app/(site)/liked/components/LikedPresenter';

interface LikedControllerProps {
  songs: Song[]
}

/**
 * This component handles liking songs and renders liked songs
 */
export default function LikedController({
  songs
}: LikedControllerProps) {
  const { isLoading, user } = useUser();
  const router = useRouter();

	/**
	 * This hook prevents unauthenticated users from accessing liked content
	 */
	React.useEffect(() => {
		if (!isLoading && !user) {
			router.replace("/");
		}
	}, [isLoading, user, router]);

  return (
    <LikedPresenter 
      songs={songs} 
      user={user}
    />
  )
};