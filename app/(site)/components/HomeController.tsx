"use client"

import { useUser } from "@/app/hooks/useUser";
import { Song } from "@/types";
import { HomePresenter } from '@/app/(site)/components/HomePresenter';

interface HomeControllerProps {
  songs: Song[]
}

/**
 * This function gets the user using the client hook `useUser`
 */
export function HomeController({
	songs
}: HomeControllerProps) {
	const { user } = useUser();
	return (
		<HomePresenter 
			songs={songs}
			user={user}
		/>
	)
}