import Header from "@/components/Header/Header";
import { User } from "@supabase/supabase-js";
import AccountContent from "./AccountContent";

interface AccountPresenterProps {
  user: User | null
}

export default function AccountPresenter({
  user
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
			<AccountContent />
		</div>
	);
};