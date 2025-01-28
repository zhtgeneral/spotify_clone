import getSongs from "@/actions/getSongs";
import { HomePresenter } from "./components/HomePresenter";

/** This is used to disable caching */
export const revalidate = 0;

export default async function HomeController() {
	const songs = await getSongs();
	return (
		<HomePresenter 
			songs={songs} 
		/>
	)
}
