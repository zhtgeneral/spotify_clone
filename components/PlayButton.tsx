import clsx from "clsx";
import { FaPlay } from "react-icons/fa";

/**
 * This component that renders a reusable play button.
 *
 * It appears green with black play icon that is enlarged when hovered over
 */
const PlayButton = () => {
	return (
		<button className={clsx(`
			transition opacity-0 rounded-full flex items-center 
			bg-main p-4 drop-shadow-md
			translate translate-y-1/4 
			group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110
		`)}>
			<FaPlay className="text-black" />
		</button>
	);
};

export default PlayButton;
