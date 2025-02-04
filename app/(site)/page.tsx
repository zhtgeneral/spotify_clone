import getSongs from "@/actions/getSongs";
import { HomeController } from "./components/HomeController";

/** This is used to disable caching */
export const revalidate = 0;

/**
 * This functiong gets the songs from the server and gives it to the controller
 */
export default async function HomeServer() {
	const songs = await getSongs();
	return (
		<HomeController songs={songs} />
	)
}
