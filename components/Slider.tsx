"use client";

import * as RadixSlider from "@radix-ui/react-slider";

/**
	Component that renders a slider.
  
  The slider is horizontal, thin, white. The current value of the slider is a bar that shows the current value
   
  The slider steps by ```0.1``` and is from ```[0, 1]```
  
   @param value Optional ```number``` and defaults to 1
	 @param onChange Optional ```(value: number) => void``` that handles the change in value
   @returns {JSX.Element}
 */
const Slider = ({
	value = 1,
	onChange,
}: {
	value?: number;
	onChange?: (value: number) => void;
}) => {
	const handleChange = (newValue: number[]) => {
		onChange?.(newValue[0]);
	};

	return (
		<RadixSlider.Root
			className="relative flex items-center select-none touch-none w-full h-10"
			defaultValue={[1]}
			value={[value]}
			onValueChange={handleChange}
			max={1}
			step={0.1}
			aria-label="Volume"
		>
			<RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
				<RadixSlider.Range className="absolute bg-white rounded-full h-full"></RadixSlider.Range>
			</RadixSlider.Track>
		</RadixSlider.Root>
	);
};

export default Slider;
