'use client'

import Button from '@/app/components/Button';
import useSubscribeModal from '@/app/hooks/modals/useSubscribeModal';
import { Subscription } from '@/app/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface AccountContentProps {
	subscription: Subscription | null,
	isLoading: boolean
}

/**
 * This component shows the content for the account.
 * 
 * If the user has a subscription, it tells the user the active plan.
 * 
 * Otherwise it shows a subscribe button which opens the subscribe modal.
 */
export default function AccountContent({
	isLoading,
	subscription
}: AccountContentProps) {
	const router = useRouter();
	const subscribeModal = useSubscribeModal();

	const [actionLoading, setActionLoading] = useState(false);

	async function redirectToCustomerPortal() {
		setActionLoading(true);
		try {
      const { data } = await axios.post("/api/portal");
      router.replace(data.url);
		} catch (error: any) {
			toast.error(error.message);
		}
		setActionLoading(false);
	}

	let content = (
		<div className='flex flex-col gap-y-4'>
			<p>No active subscription.</p>
			<Button   
				onClick={() => subscribeModal.onOpen()}
				className='w-[300px]'
				disabled={isLoading}
			> 
				Subscribe
			</Button>
		</div>
	)

	if (subscription) {
		let message = <p>You are currently subscribed.</p>
		if (subscription?.prices?.products?.name) {
			message = <p>You are currently subscribed on the <b>{subscription?.prices?.products?.name}</b> plan.</p>
		}
		content = (
			<div className='flex flex-col gap-y-4'>
				{message}
				<Button
					disabled={actionLoading || isLoading}
					onClick={redirectToCustomerPortal}
					className="w-[300px]"  
				>
					Open customer portal
				</Button>
			</div>
		)
	}

	console.log(`AccountContent isLoading ${isLoading}`)

	return (
		<div className='mb-7 px-6'>
			{content}
		</div>
	)
};