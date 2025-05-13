"use client";

import usePlayer from "@/app/hooks/usePlayer";

import Box from "@/app/components/Box";
import Library from '@/app/components/Sidebar/Library';
import SidebarItem from "@/app/components/Sidebar/SidebarItem";
import { Song } from "@/app/types/types";
import { twMerge } from "tailwind-merge";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

interface SideBarProps {
	children?: React.ReactNode;
	songs: Song[];
}

/**
 * This component renders the sidebar that displays to the left of the screen.
 * 
 * It renders the links onto the sidebar. 
 * When the links are clicked, they redirect the user to either `/` or `/search`.
 * 
 * If the player is active, the height of the sidebar decreases to make room for the player.
 * 
 * @requires UserProvider needs to be around this component.
 * @requires SupabaseProvider needs to be aounrd this component.
 */
export default function SideBar({
	children,
	songs,
}: SideBarProps) {
	const player = usePlayer();
	const pathname = usePathname();

	const routes = useMemo(
		() => [
			{
				icon: HiHome,
				label: "Home",
				active: pathname === "/",
				href: "/",
			},
			{
				icon: BiSearch,
				label: "Search",
				active: pathname === "/search",
				href: "/search",
			},
		],
		[pathname]
	);

	return (
		<div
			className={twMerge(
				"flex h-full",
				player.activeId && "h-[calc(100%-80px)]"
			)}
		>
			<div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
				<Box>
					<div className="flex flex-col gap-y-4 px-5 py-4">
						{routes.map((item) => (
							<SidebarItem
								key={item.label}
								icon={item.icon}
								label={item.label}
								active={item.active}
								href={item.href}
							/>
						))}
					</div>
				</Box>
				<Box className="overflow-y-auto h-full">
					<Library songs={songs} />
				</Box>
			</div>
			<main className="h-full flex-1 overflow-y-auto py-2">
				{children}
			</main>
		</div>
	);
};