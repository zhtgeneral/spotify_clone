"use client";

import Box from "@/components/Box";
import { BounceLoader } from "react-spinners";

/**
 * This component renders a loading animation
 */
const Loading = () => {
	return (
		<Box className="h-full flex items-center justify-center">
			<BounceLoader 
				color="rgb(var(--main))" 
				size={40} 
			/>
		</Box>
	);
};

export default Loading;
