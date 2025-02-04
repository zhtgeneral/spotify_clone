import getSongsByTitle from "@/actions/getSongByTitle";
import SearchController from './components/SearchController';

interface SearchServerProps {
	searchParams: {
		title: string;
	}
}

/**
 * This component handles searching songs.
 * 
 * @requires title is on searchParams
 */
export default async function SearchServer({ 
	searchParams
}: SearchServerProps) {
	const songs = await getSongsByTitle(searchParams.title);
	return (
		<SearchController 
			songs={songs} 
		/>
	)
};