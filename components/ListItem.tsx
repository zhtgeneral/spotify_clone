"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import clsx from "clsx";

interface ListItemProps {
	image: string;
	name: string;
	href: string;
}

/**
 * This component shows a billboard that takes the user to liked songs.
 * 
 * If the user isn't logged in, it opens the Auth Modal.
 * Otherwise it takes the user to `/liked`.
 */
const ListItem: React.FC<ListItemProps> = ({
	image,
	name,
	href,
}) => {
	const router = useRouter();
	const { user } = useUser();
	const authModal = useAuthModal();

	const onClick = () => {
		if (!user) {
			authModal.onOpen();
		}
		router.push(href);
	};

	return (
		<button
			onClick={onClick}
			className={clsx(`relative group flex items-center 
				rounded-md overflow-hidden gap-x-4 pr-4
				bg-neutral-100/10 hover:bg-neutral-100/20 transition
			`)}
		>
			<div className="relative min-h-[64px] min-w-[64px]">
				<Image
					className="object-cover"
					fill
					src={image}
					alt="Image"
					sizes="1000"
				/>
			</div>
			<p className="font-medium truncate py-5">{name}</p>
			<div className={clsx(`
				absolute rounded-full flex items-center justify-center 
				bg-green-500 p-4 right-5 drop-shadow-md
				opacity-0 transition group-hover:opacity-100 hover:scale-110
			`)}>
				<FaPlay className="text-black" />
			</div>
		</button>
	);
};
export default ListItem;
