import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * This component renders a reusable button with custom styling.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, disabled, type = "button", ...props }, ref) => {
		const style =
			`w-full rounded-full 
			bg-green-500 text-black font-bold 
			border border-transparent 
			px-3 py-3 
			disabled:cursor-not-allowed disabled:opacity-50 
			hover:opacity-75 transition`;
		return (
			<button
				type={type}
				className={twMerge(style, className)}
				disabled={disabled}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";
export default Button;
