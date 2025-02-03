"use client"

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { HomePresenter } from '@/app/(site)/components/HomePresenter';

interface HomeControllerClientProps {
  songs: Song[]
}

/**
 * This function gets the user using the client hook `useUser`
 */
export function HomeControllerClient({
	songs
}: HomeControllerClientProps) {
	const { user } = useUser();
	return (
		<HomePresenter 
			songs={songs}
			user={user}
		/>
	)
}