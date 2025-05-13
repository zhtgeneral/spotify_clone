import { defineConfig } from "cypress";
import { getURL } from './app/utils/getUrl';

export default defineConfig({
	e2e: {
		specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/cypress/support/e2e.{js,jsx,ts,tsx}',
    screenshotsFolder: 'test/cypress/screenshots',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: getURL(),
	},

	component: {
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
	},
});
