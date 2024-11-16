'use client'

import Button from '@/components/Button';
import useSubscribeModal from '@/hooks/modals/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AccountContent = () => {
	const router = useRouter();
	const subscribeModal = useSubscribeModal();
	const { isLoading, subscription, user } = useUser();

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!isLoading && !user) {
			router.replace("/");
		}
	}, [user, isLoading, router]);
	async function redirectToCustomerPortal() {
		setLoading(true);
		try {
      const { data } = await axios.post("/api/portal");
      router.replace(data.url);
		} catch (error: any) {
			toast.error(error.message);
		}
		setLoading(false);
	}
	return (
		<div className='mb-7 px-6'>
			{!subscription && (
				<div className='flex flex-col gap-y-4'>
          <p>No active subscription.</p>
          <Button   
            onClick={() => subscribeModal.onOpen()}
            className='w-[300px]'
          > 
            Subscribe
          </Button>
				</div>
			)}
      {subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>You are currently subscribed on the <b>{subscription?.prices?.products?.name}</b> plan.</p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"  
          >
            Open customer portal
          </Button>
        </div>
      )}
		</div>
	)
};

export default AccountContent;
