import getSongsByTitle from "@/actions/getSongByTitle";
import { SearchPresenter } from "./components/SearchPresenters";

interface SearchControllerProps {
	searchParams: {
		title: string;
	}
}

/**
 * This component handles searching songs.
 * 
 * @requires title is on searchParams
 */
export default async function SearchController({ 
	searchParams
}: SearchControllerProps) {
	const songs = await getSongsByTitle(searchParams.title);
	return (
		<SearchPresenter songs={songs}/>
	)
};