"use client";

import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
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
 * This component handles displaying each product in a modal.
 * 
 * 
 */
const SubscribeModal: React.FC<SubscribeModalProps> = ({ 
	products
}) => {
	const [priceIDLoading, setPriceIDLoading] = useState<string>();
	const { user, isLoading, subscription } = useUser();
	const [modalOpen, setModalOpen] = useState(true);

	const handleModalChange = () => {
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
			description="listen to music with Music App Gold"
			isOpen={modalOpen}
			onChange={handleModalChange}
		>
			{content}
		</Modal>
	);
};

export default SubscribeModal;
