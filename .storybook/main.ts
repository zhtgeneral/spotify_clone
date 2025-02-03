import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	staticDirs: ["..\\public"],
	docs: {
		defaultName: 'Documentation'
	},
	env: (config) => ({
		...config
	}),
	webpackFinal: async (config) => {
		/** This enables tailwind css to be loaded in storybook */
    if (config?.module?.rules) {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      });
    }
    return config;
  },
};
export default config;
