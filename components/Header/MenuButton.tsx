import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

/**
 * This component renders the search and home button.
 * 
 * It renders for mobile views only.
 */
const MenuButton = () => {
  return (
    <div className="flex md:hidden gap-x-2 items-center">
      <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
        <HiHome className="text-black" size={20} />
      </button>
      <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
        <BiSearch className="text-black" size={20} />
      </button>
    </div>
  )
}
export default MenuButton;