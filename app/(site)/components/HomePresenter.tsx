"use client"

import ListItem from '@/app/(site)/components/ListItem';
import Header from "@/components/Header/Header";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import PageContent from './PageContent';
import { User } from '@supabase/supabase-js';

interface HomePresenterProps {
	songs: Song[],
	user: User | null
}

/**
 * This is the main page
 * 
 * It renders the header, an image that redirects to the liked songs, and the page content
 */
export function HomePresenter({
	songs,
	user
}: HomePresenterProps) {
  const onPlay = useOnPlay(songs);	
	return (
		<div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			<Header user={user}>
				<h1 className="text-white text-3xl font-semibold">
					Welcome Back
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
					<ListItem
						image="/images/liked.png"
						name="Liked songs"
						href="liked"
					/>
				</div>
			</Header>
			<div className="mt-2 mb-7 px-6">
				<div className="flex justify-between items-center">
					<h1 className="text-white text-2xl font-semibold">
						Newest Songs
					</h1>
				</div>
				<div>
					<PageContent songs={songs} onPlay={onPlay} />
				</div>
			</div>
		</div>
	);
}