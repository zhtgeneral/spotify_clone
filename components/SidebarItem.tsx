import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
	icon: IconType,
	label: string,
	active?: boolean,
	href: string
}

/**
 * This component renders a link on the sidebar.
 * 
 * When the link is clicked, it calls redirects the user to `href`
 * 
 * If the link is active, it displays the text in white.
 */
const SidebarItem: React.FC<SidebarItemProps> = ({
	icon: Icon,
	label,
	active,
	href,
}) => {
	const styles = `
		flex flex-row h-auto items-center w-full 
		gap-x-4 py-1 
		text-md font-medium 
		cursor-pointer hover:text-white transition text-neutral-400 
	`;
	return (
		<Link href={href} className={twMerge(styles, active && "text-white")}>
			<Icon size={26} />
			<p className="truncate w-full">
				{label}
			</p>
		</Link>
	);
};

export default SidebarItem;
