"use client";

import Box from "@/app/components/Box";
import { BounceLoader } from "react-spinners";

/**
 * This component renders a loading animation
 * 
 * @requires css variables needs be loaded
 */
export default function Loading() {
	return (
		<Box className="h-full flex items-center justify-center">
			<BounceLoader 
				color="rgb(var(--main))" 
				size={40} 
			/>
		</Box>
	);
};