import Button from "@/app/components/Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";

/**
 * This component renders the logout and account button.
 * 
 * @requires user needs to be logged in.
 */
export default function LoggedInView() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  
  async function handleLogout() {
		const { error } = await supabaseClient.auth.signOut();
		router.refresh();
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("Logged out");
		}
	};

  return (
    <div className="flex gap-x-4 items-center">
      <Button 
        onClick={handleLogout} 
        className="bg-white px-6 py-2"
      >
        Logout
      </Button>
      <Button
        onClick={() => router.push("/account")}
        className="bg-white"
      >
        <FaUserAlt />
      </Button>
    </div>
  )
}