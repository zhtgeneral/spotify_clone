"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Price, ProductWithPrice } from "@/types";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";

const formatPrice = (price: Price) => {
	const priceString = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: price.currency,
		minimumFractionDigits: 0,
	}).format((price?.unit_amount || 0) / 100);

	return priceString;
};

const SubscribeModal = ({ products }: { products: ProductWithPrice[] }) => {
	const [priceIDLoading, setPriceIDLoading] = useState<string>();
	const { user, isLoading, subscription } = useUser();
	const [modalOpen, setModalOpen] = useState(false);

	const handleModelOpen = (open: boolean): void => {
		modalOpen ? setModalOpen(true) : setModalOpen(false);
	};

	const handleCheckout = async (price: Price) => {
		setPriceIDLoading(price.id);
		if (!user) {
			setPriceIDLoading(undefined);
			return toast.error("must be logged in");
		}
		if (subscription) {
			setPriceIDLoading(undefined);
			return toast("Already subscribed");
		}
		try {
			const { sessionId } = await postData({
				url: "/api/create-checkout-session",
				data: { price },
			});

			const stripe = await getStripe();
			stripe?.redirectToCheckout({ sessionId });
		} catch (error) {
			toast.error((error as Error)?.message);
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
							{`Subscribe for ${formatPrice(price)} for ${price.interval}`}
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
			title="Only for premium users"
			description="listen to music with Spatify Gold"
			isOpen={modalOpen}
			onChange={handleModelOpen}
		>
			{content}
		</Modal>
	);
};

export default SubscribeModal;
