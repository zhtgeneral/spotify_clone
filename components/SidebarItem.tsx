import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  href
}: {
  icon: IconType;
  label: string;
  active?: boolean,
  href: string
}) => {
  const styles = 'flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1'
  return (
    <Link href={href} className={twMerge(styles, active && "text-white")}>
      <Icon size={26}/>
      <p className='truncate w-full'>{label}</p>
    </Link>
  )
}

export default SidebarItem