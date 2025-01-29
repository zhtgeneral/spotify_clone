"use client";

import LoggedInView from "@/components/Header/LoggedInView";
import LoggedOutView from "@/components/Header/LoggedOutView";
import MenuButton from "@/components/Header/MenuButton";
import TraverseButton from "@/components/Header/TraverseButton";
import { User } from "@supabase/supabase-js";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
	children: React.ReactNode;
	className?: string;
	user: User | null
}

/**
 * This component renders the header for the main home page.
 * 
 * It renders the different views in the top right depending on if the user is logged in.
 * 
 * It renders traverse buttons to traverse urls.
 * 
 * It renders the remaining liked songs inside the header.
 */
export default function Header({
	children,
	className,
	user
}: HeaderProps) {
	return (
		<div
			className={twMerge(
				"h-fit bg-gradient-to-b from-main-darken p-6 mb-2",
				className
			)}
		>
			<div className="w-full mb-4 flex items-center justify-between">
				<TraverseButton />
				<MenuButton />
				<div className="flex justify-between items-center gap-x-4">
					{user 
						? <LoggedInView /> 
						: <LoggedOutView />
					}
				</div>
			</div>
			{children}
		</div>
	);
};