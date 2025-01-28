import type { Preview } from "@storybook/react";

/** This line imports styles from tailwind css */
import "../app/globals.css"

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
