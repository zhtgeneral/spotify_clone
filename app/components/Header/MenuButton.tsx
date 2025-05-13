import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

/**
 * This component renders the search and home button.
 * 
 * It renders for mobile views only.
 */
export default function MenuButton() {
  const size = 20;
  const router = useRouter();
  return (
    <div className="flex md:hidden gap-x-2 items-center">
      <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
        <HiHome 
          className="text-black" 
          onClick={() => router.replace("/")}
          size={size} 
        />
      </button>
      <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
        <BiSearch 
          className="text-black" 
          onClick={() => router.replace("/search")}
          size={size} 
        />
      </button>
    </div>
  )
}