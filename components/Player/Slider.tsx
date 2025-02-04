"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
	value: number,
	onChange: (value: number) => void;
}

/**
 * This component renders a slider that controls `onChange` by 0.05 step.
 * 
 * The default value of the slide is 1.
 */
export default function Slider({
	value = 1,
	onChange,
}: SliderProps) {
	
	function handleChange(newValue: number[]) {
		onChange(newValue[0]);
	};

	return (
		<RadixSlider.Root
			className="relative flex items-center select-none touch-none w-full h-10"
			defaultValue={[1]}
			value={[value]}
			onValueChange={handleChange}
			max={1}
			step={0.05}
			aria-label="Volume"
		>
			<RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
				<RadixSlider.Range className="absolute bg-white rounded-full h-full"></RadixSlider.Range>
			</RadixSlider.Track>
		</RadixSlider.Root>
	);
};