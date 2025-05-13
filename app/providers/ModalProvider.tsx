"use client";

import React, { useEffect, useState } from "react";
import { ProductWithPrice } from "@/app/types/types";
import AuthModal from "@/app/components/modals/AuthModal";
import SubscribeModal from "@/app/components/modals/SubscribeModal";
import UploadModal from "@/app/components/modals/UploadModal";

interface ModalProviderProps {
	products: ProductWithPrice[]
}

/**
 * This component allows access to many modals.
 * 
 * It allows access to Auth, Upload, and Subscribe modals.
 */
const ModalProvider: React.FC<ModalProviderProps> = ({ 
	products
}) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<>
			<AuthModal />
			<UploadModal />
			<SubscribeModal products={products} />
		</>
	);
};

export default ModalProvider;
