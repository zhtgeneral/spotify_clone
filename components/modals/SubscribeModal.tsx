"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Price, ProductWithPrice, Subscription } from "@/types";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import formatPrice from "@/utils/formatPrice";
import axios from "axios";
import useSubscribeModal from "@/hooks/modals/useSubscribeModal";

interface DebuggingProps {
	subscription: Subscription | null,
	isOpen: boolean,
	priceLoading: string,
	userIsLoading: boolean
}

interface SubscribeModalProps {
	products: ProductWithPrice[],
	debug?: DebuggingProps
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
export default function SubscribeModal({ 
	products,
	debug
}: SubscribeModalProps) {
	const subscribeModal = useSubscribeModal();
	const { user, isLoading, subscription } = useUser();

	const [priceLoading, setPriceLoading] = useState<string | undefined>(undefined);

	let isUserLoading = isLoading;
	let isModalOpen = subscribeModal.isOpen;
	if (debug) {
		isUserLoading = debug.userIsLoading;
		isModalOpen = debug.isOpen;
	}

	/**
	 * This function toggles the modal's open state
	 */
	function handleModalChange() {
		subscribeModal.isOpen? subscribeModal.onClose(): subscribeModal.onOpen();
	};
	/**
	 * This function handles the checkout of a price item.
	 * 
	 * If the user is not logged in or already subscribed, it notifies the user.
	 * 
	 * Otherwise it sends a POST request to `/api/checkout` 
	 * and sends the user to the Stripe checkout page.
	 * 
	 * On completion, the loading state is reset.
	 */
	async function handleCheckout(price: Price) {
		if (!user) {
			setPriceLoading(undefined);
			return toast.error("Must be logged in to see subscriptions");
		}
		if (subscription) {
			setPriceLoading(undefined);
			return toast("Thanks! You already subscribed");
		}

		setPriceLoading(price.id);
		try {
			const { data } = await axios.post("/api/checkout", { price });
			window.location.href = data.url;
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setPriceLoading(undefined);
		}
	};
	/**
	 * This function renders the products.
	 * 
	 * For each product:
	 * If there are no prices, it displays a message for no prices. 
	 * Otherwise it shows a price button for each price.
	 */
	function renderProducts(products: ProductWithPrice[]) {
		return (
			<div>
				{
					products.map((product: ProductWithPrice) => {
						if (!product.prices?.length) {
							return (
								<div key={product.id}>
									No prices available.
								</div>
							)
						}
						return product.prices.map((price: Price) => {
							return renderPriceButton(price);
						})
					})
				}
			</div>
		);
	}
	/**
	 * This function renders a price button.
	 * 
	 * If a single price is loading, it renders a single disabled button.
	 * All price buttons are disabled if the user is loading.
	 * Otherwise no price buttons are disabled.
	 */
	function renderPriceButton(price: Price) {
		let isProductLoading = priceLoading === price.id;
		if (debug) {
			isProductLoading = debug.priceLoading === price.id;
		}
		const subscribeMessage 
		= price.interval?
			`Subscribe for ${formatPrice(price)} a ${price.interval}` : 
			`Subscribe for ${formatPrice(price)}`;
		return (
			<Button
				key={price.id}
				className="mb-4"
				onClick={() => handleCheckout(price)}
				disabled={isUserLoading || isProductLoading}
			>
				{subscribeMessage}
			</Button>
		)
	}

	let content = (
		<div className="text-center">
			No products available.
		</div>
	)

	if (products.length) {
		content = renderProducts(products);
	}

	if (subscription || debug?.subscription) {
		content = (
			<div className="text-center">
				Already subscribed
			</div>	
		)
	}
	return (
		<Modal
			title="This feature is only for premium users"
			description="Get unlimited cookies with Music App Gold"
			isOpen={isModalOpen}
			onChange={handleModalChange}
		>
			{content}
		</Modal>
	);
};
