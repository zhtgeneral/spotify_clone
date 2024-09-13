"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LikedContent = ({ songs }: { songs: Song[] }) => {
	const onPlay = useOnPlay(songs);

	const router = useRouter();
	const { isLoading, user } = useUser();

	useEffect(() => {
		if (!isLoading && !user) router.replace("/");
	}, [isLoading, user, router]);

	if (songs.length === 0) {
		return (
			<div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
				{" "}
				No liked songs
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-y-2 w-full p-6">
			{songs.map((item: any) => (
				<div
					key={item.id}
					className="flex items-center gap-x-4 w-full"
					id="liked-songs"
				>
					<div className="flex-1">
						<MediaItem onClick={(id: string) => onPlay(id)} data={item} />
					</div>
					<LikeButton songId={item.id} />
				</div>
			))}
		</div>
	);
};

export default LikedContent;
