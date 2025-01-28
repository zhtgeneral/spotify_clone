import { useUser } from "@/hooks/useUser";
import AccountPresenter from "./components/AccountPresenter";

export default function AccountController() {
	const { user } = useUser();
	return (
		<AccountPresenter user={user}/>
	);
};