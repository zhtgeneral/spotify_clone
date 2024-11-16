"use client";

import { twMerge } from "tailwind-merge";
import { useUser } from "@/hooks/useUser";
import TraverseButton from "@/components/Header/TraverseButton";
import MenuButton from "@/components/Header/MenuButton";
import LoggedInView from "@/components/Header/LoggedInView";
import LoggedOutView from "@/components/Header/LoggedOutView";

interface HeaderProps {
	children: React.ReactNode;
	className?: string;
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
const Header: React.FC<HeaderProps> = ({
	children,
	className,
}) => {
	const { user } = useUser();
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

export default Header;
