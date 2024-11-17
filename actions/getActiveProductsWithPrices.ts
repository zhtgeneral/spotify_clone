import { Product } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * This function gets all the products with prices from Supabase.
 * 
 * @requires Stripe product and price events are synced into Supabase
 */
export default async function getActiveProductsWithPrices(): Promise<Product[]> {
	const supabase = createServerComponentClient({ cookies: cookies });
	const { data, error } = await supabase
		.from("products")
		.select("*, prices(*)")
		.eq("active", true)
		.eq("prices.active", true)
		.order("metadata->index");

	if (error) {
		console.log("getActiveProductsWithPrices error: " + error.message);
	}
	return data || [];
};