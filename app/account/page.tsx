import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React from "react";
import AccountPresenter from "./components/AccountPresenter";

export default function AccountController() {
	const { user, subscription, isLoading } = useUser();
	const router = useRouter();
	
	/**
	 * This hook prevents unauthorized access to /account
	 */
	React.useEffect(() => {
		if (!isLoading && !user) {
			router.replace("/");
		}
	}, [user, isLoading, router]);

	return (
		<AccountPresenter 
			user={user} 
			subscription={subscription}
			isLoading={isLoading}
		/>
	);
};