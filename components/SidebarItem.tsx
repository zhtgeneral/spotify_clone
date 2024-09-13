import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

/**
  Component that renders a route with the route's icon and label.

	The component is rectangular and dark grey. 
	The text and icon are light gray and become white when hovered over or selected

  @param icon Icon that appears to left of the component
  @param label string that appears to the right of the component
	@param active boolean that determines if the icon is highlighted
	@param href string that is the route
  @returns JSX.Element
 */
const SidebarItem = ({
	icon: Icon,
	label,
	active,
	href,
}: {
	icon: IconType;
	label: string;
	active?: boolean;
	href: string;
}) => {
	const styles =
		"flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1";
	return (
		<Link href={href} className={twMerge(styles, active && "text-white")}>
			<Icon size={26} />
			<p className="truncate w-full">{label}</p>
		</Link>
	);
};

export default SidebarItem;
