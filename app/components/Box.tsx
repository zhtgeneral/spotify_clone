import React from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
	children: React.ReactNode;
	className?: string;	
}

/**
 * This component renders a reusable box.
 */
export default function Box({
	children,
	className,
}: BoxProps) {
	return (
		<div
			className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}
		>
			{children}
		</div>
	);
};