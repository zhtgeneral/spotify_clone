import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLElement> {}

/**
 * This component renders a reusable input.
 * 
 * It displays different styling for file/text inputs.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, disabled, ...props }, ref) => {
		const styles = `
			flex w-full rounded-md 
			bg-neutral-700 
			border border-transparent 
			px-3 py-3 text-sm 
			file:border-0 file:bg-transparent file:text-sm file:font-medium 
			placeholder:text-neutral-400 
			disabled:cursor-not-allowed disabled:opacity-50 
			focus:outline-none`;
		return (
			<input
				type={type}
				className={twMerge(styles, className)}
				disabled={disabled}
				ref={ref}
				{...props}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
