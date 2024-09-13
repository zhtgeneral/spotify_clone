"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

/**
  Component that renders the main home page.

	The header consists of a login button and user account button in the top right. 
	On the top left is a back/forward button that takes the user to the previous/next url they were on.
	Renders the remaining children below.
	
	When the login button is clicked on, it opens the login modal.

	If the user is logged in, the logout button will replace the login button.
	When the logout button is pressed, the user is logged out and directed to the home page.

	When the account info button is pressed, the user is taken to the accounts page (TODO)

  @param children the media that is rendered below the header
  @returns JSX.Element
 */
const Header = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const AuthModal = useAuthModal();
	const router = useRouter();

	// from supabase docs for log out
	const supabaseClient = useSupabaseClient();

	const { user } = useUser();

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut();
		router.refresh();
		if (error) toast.error(error.message);
		else toast.success("Logged out");
	};
	return (
		<div
			className={twMerge(
				"h-fit bg-gradient-to-b from-emerald-800 p-6",
				className
			)}
		>
			<div className="w-full mb-4 flex items-center justify-between">
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
				{/* below is for mobile view */}
				<div className="flex md:hidden gap-x-2 items-center">
					<button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
						<HiHome className="text-black" size={20} />
					</button>
					<button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
						<BiSearch className="text-black" size={20} />
					</button>
				</div>
				{/* end of mobile only view */}
				<div className="flex justify-between items-center gap-x-4">
					{user ? (
						<div className="flex gap-x-4 items-center">
							<Button onClick={handleLogout} className="bg-white px-6 py-2">
								Logout
							</Button>
							<Button
								onClick={() => router.push("/account")}
								className="bg-white"
							>
								<FaUserAlt />
							</Button>
						</div>
					) : (
						<>
							<div>
								<Button
									onClick={AuthModal.onOpen}
									className="bg-transparent text-neutral-300 font-medium"
								>
									Sign up
								</Button>
							</div>
							<div>
								<Button
									onClick={AuthModal.onOpen}
									className="bg-white px-6 py-2"
								>
									Log in
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
			{children}
		</div>
	);
};

export default Header;
