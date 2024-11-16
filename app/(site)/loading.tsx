"use client";

import Box from "@/components/Box";
import { BounceLoader } from "react-spinners";

/**
 * This component renders a loading animation
 */
const Loading = () => {
	return (
		<Box className="h-full flex items-center justify-center">
			<BounceLoader color="#22c55e" size={40} />
		</Box>
	);
};

export default Loading;
