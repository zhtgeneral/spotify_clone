import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

/** This is used to disable caching */
export const revalidate = 0;

/**
 * This component handles liking songs and renders liked songs
 */
const LikedPage = async () => {
	const songs = await getLikedSongs();
	return (
		<div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			<Header>
				<div className="mt-20">
					<div className="flex flex-col md:flex-row items-center gap-x-5">
						<div className="relative h-32 w-32 lg:h-44 lg:w-44">
							<Image
								fill
								src="/images/liked.png"
								alt="playlist"
								className="object-cover"
								sizes="1000"
							/>
						</div>
						{/* below is mobile view */}
						<div className="flex flex-col gap-y-2 mt-4 md:mt-0">
							<p className="hidden md:block">
								Playlist
							</p>
							<h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
								Liked songs
							</h1>
						</div>
					</div>
				</div>
			</Header>
			<LikedContent songs={songs} />
		</div>
	);
};

export default LikedPage;
