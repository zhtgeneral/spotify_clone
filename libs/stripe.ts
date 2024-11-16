import Stripe from "stripe";

/**
 * Stripe instance
 * 
 * TODO move secret key away from client
 * @requires NEXT_PUBLIC_SECRET_KEY in environment variables
 */
export const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY!, {
	apiVersion: "2023-10-16",
	appInfo: {
		name: "Spotify clone project",
		version: "0.1.0",
	},
});
