import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
	isOpen: boolean;
	onChange: (open: boolean) => void;
	title: string;
	description: string;
	children: React.ReactNode;
}

/**
 * This reusable component renders a modal displaying its child contents.
 * 
 * It renders an `x` button that closes the modal when clicked.
 * 
 * It renders a dark and blured background when the modal is open.
 */
export default function Modal({
	isOpen,
	onChange,
	title,
	description,
	children,
}: ModalProps) {
	return (
		<Dialog.Root 
			open={isOpen} 
			defaultOpen={isOpen} 
			onOpenChange={onChange}
		>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
				<Dialog.Content className={clsx(`
					fixed drop-shadow-md border border-neutral-700 max-h-full h-full
					w-full md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px] 
					translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] 
					rounded-md bg-neutral-800 p-[25px] focus:outline-none
				`)}>
					<Dialog.Title className="text-xl text-center font-bold mb-4">
						{title}
					</Dialog.Title>
					<Dialog.Description className="mb-5 text-sm leading-normal text-center">
						{description}
					</Dialog.Description>
					<div>
						{children}
					</div>
					<Dialog.Close asChild>
						<button className={clsx(`
							items-center justify-center rounded-full text-neutral-400 
							top-[10px] right-[10px] h-[25px] w-[25px]
							inline-flex appearance-nonw 
							focus:outline-none hover:text-white absolute 
						`)}>
							<IoMdClose />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};