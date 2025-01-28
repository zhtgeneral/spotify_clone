import getSongs from "@/actions/getSongs";
import { HomePresenter } from "./components/HomePresenter";
import { useUser } from "@/hooks/useUser";

/** This is used to disable caching */
export const revalidate = 0;

export default async function HomeController() {
	const songs = await getSongs();
	const { user } = useUser();
	return (
		<HomePresenter 
			songs={songs} 
			user={user}
		/>
	)
}
