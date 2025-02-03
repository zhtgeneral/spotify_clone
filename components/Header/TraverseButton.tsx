import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

/**
 * This component allows the user to traverse urls with a forward and back button.
 * 
 * It is hidden for mobile view.
 */
export default function TraverseButton() {
  const router = useRouter();
  return (
    <div className="hidden md:flex gap-x-2 items-center">
      <button
        onClick={() => router.back()}
        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
      >
        <RxCaretLeft size={35} />
      </button>
      <button
        onClick={() => router.forward()}
        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
      >
        <RxCaretRight size={35} />
      </button>
    </div>
  )
}