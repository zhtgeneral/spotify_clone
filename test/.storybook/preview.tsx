import type { Preview } from "@storybook/react";
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/** This line imports mock context for tests */
import UserProvider from '../../app/providers/UserProvider';
import SupabaseProvider from '../../app/providers/SupabaseProvider';
import mockRouterContext from "./mocks/MockRouterContext";

/** This line imports styles from tailwind css */
import "../../app/(site)/globals.css";



const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			values: [
				{
					name: 'Light', 
					value: "#FFFFFF"
				},
				{
					name: "Dark",
					value: "#000000"
				}
			],
			default: "Dark"
		},
		initialGlobals: {
			backgrounds: {
				value: 'light'
			}
		}
	},
	decorators: [
		(Story) => (
			/** This context gives access to a mock router */
			<AppRouterContext.Provider value={mockRouterContext}>
				<Story />
			</AppRouterContext.Provider>
		),
		(Story) => (			
			/** This context gives access to a mock supabase storage */
			<SupabaseProvider>
				<Story />
			</SupabaseProvider>			
		),
		(Story) => (
			/** This context gives access to useUser hook */
			<UserProvider>
				<Story />
			</UserProvider>
		)
	]
};

export default preview;
