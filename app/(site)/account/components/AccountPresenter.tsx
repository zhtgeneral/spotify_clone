import Header from "@/app/components/Header/Header";
import { Subscription } from "@/types";
import { User } from "@supabase/supabase-js";
import AccountContent from "./AccountContent";

interface AccountPresenterProps {
  user: User | null,
	subscription: Subscription | null,
	isLoading: boolean
}

export default function AccountPresenter({
  user,
	isLoading,
	subscription
}: AccountPresenterProps) {
	return (
		<div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			<Header user={user} className='from-bg-netural-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className="text-white text-3xl font-semibold">
						Account settings
					</h1>
				</div>
			</Header>
			<AccountContent 
				subscription={subscription}
				isLoading={isLoading}
			/>
		</div>
	);
};