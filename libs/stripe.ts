// comes from stripe js docs

import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Spotify clone project",
    version: "0.1.0",
  },
});
