"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Price, ProductWithPrice } from "@/types";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import formatPrice from "@/utils/formatPrice";
import axios from "axios";

interface SubscribeModalProps {
	products: ProductWithPrice[]
}

/**
 * This component handles displaying each product in a modal with loading states.
 * 
 * If the user is not logged in, it will not show the products.
 * 
 * If the user has a currently active subscription, 
 * the products are not rendered and a thank you message is shown.
 * 
 * Otherwise selecting a product will redirect the user to a Stripe checkout session.
 * 
 * On successful checkout, the user is redirected to `/account`.
 * 
 * On canceled checkout, the user is redirected to `/`.
 * 
 * @requires `/api/create-checkout-session` has `success_url` and `cancel_url` set
 * @requires `MyUserContextProvider` wraps the component
 */
const SubscribeModal: React.FC<SubscribeModalProps> = ({ 
	products
}) => {
	const [priceIDLoading, setPriceIDLoading] = useState<string>();
	const { user, isLoading, subscription } = useUser();
	const [modalOpen, setModalOpen] = useState(true);

	function handleModalChange() {
		if (modalOpen) {
			setModalOpen(false);
		}	else {
			setModalOpen(true);
		}
	};

	async function handleCheckout(price: Price) {
		setPriceIDLoading(price.id);
		if (!user) {
			setPriceIDLoading(undefined);
			return toast.error("Must be logged in to see subscriptions");
		}
		if (subscription) {
			setPriceIDLoading(undefined);
			return toast("Thanks! You already subscribed");
		}
		try {
			const { data } = await axios.post("/api/create-checkout-session", { 
				price 
			});
			window.location.href = data.url;
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setPriceIDLoading(undefined);
		}
	};

	let content = <div className="text-center">No products available</div>;

	if (products.length) {
		content = (
			<div>
				{products.map((product: ProductWithPrice) => {
					if (!product.prices?.length) {
						return <div key={product.id}>No prices available.</div>;
					}
					return product.prices.map((price) => (
						<Button
							key={price.id}
							className="mb-4"
							onClick={() => handleCheckout(price)}
							disabled={isLoading || price.id === priceIDLoading}
						>
							{`Subscribe for ${formatPrice(price)} a ${price.interval}`}
						</Button>
					));
				})}
			</div>
		);
	}

	if (subscription) {
		content = <div className="text-center">Already subscribed</div>;
	}
	return (
		<Modal
			title="This feature is only for premium users"
			description="Get unlimited cookies with Music App Gold"
			isOpen={modalOpen}
			onChange={handleModalChange}
		>
			{content}
		</Modal>
	);
};

export default SubscribeModal;
