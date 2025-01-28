import Header from "@/components/Header/Header";
import AccountContent from "./components/AccountContent";

export default function AccountPage() {
	return (
		<div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			<Header className='from-bg-netural-900'>
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