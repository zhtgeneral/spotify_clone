"use client";

import Box from "@/components/Box";

/**
 * This component displays the error page when an error is thrown
 */
const Error = () => {
	return (
		<Box className="h-full flex items-center justify-center">
			<div className="text-neutral-400">
				Something went wrong.
			</div>
		</Box>
	);
};

export default Error;
