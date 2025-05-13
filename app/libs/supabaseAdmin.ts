import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/app/libs/stripe";
import { Database } from "@/types_db";
import { Price, Product } from "@/types";
import formatDate from "@/app/utils/formatDate";

export const supabaseAdmin = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * This function upserts Stripe product data onto Supabase.
 * It throws an error if a Supabase upsert error occurs.
 *
 * @param product - Stripe.Product
 */
export async function upsertProductRecord(product: Stripe.Product) {
	const productData: Product = {
		id: product.id,
		active: product.active,
		name: product.name,
		description: product.description as string,
		image: product.images?.[0],
		metadata: product.metadata,
	};
	const upsert = await supabaseAdmin.from("products").upsert([productData]);
	if (upsert.error) {
		throw upsert.error;
	}
	console.log(`Product inserted/updated: ${product.id}`);
};

/**
 * This function upserts Stripe price data onto Supabase.
 * It throws an error if a Supabase upsert error occurs.
 *
 * @param price - Stripe.Price
 */
export async function upsertPriceRecord(price: Stripe.Price) {
	const priceData: Price = {
		id: price.id,
		product_id: price.product as string,
		active: price.active,
		currency: price.currency,
		description: price.nickname as string,
		type: price.type,
		unit_amount: price.unit_amount as number,
		interval: price.recurring?.interval,
		interval_count: price.recurring?.interval_count,
		trial_period_days: price.recurring?.trial_period_days,
		metadata: price.metadata,
	};

	const upsert = await supabaseAdmin.from("prices").upsert([priceData]);
	if (upsert.error) {
		throw upsert.error;
	}
	console.log(`Price inserted/updated: ${price.id}`);
};

/**
 * This function ensures there is a stripe customer in Supabase.
 * 
 * It checks if an existing customer exists. 
 * 
 * If there is an error or no stripe customer id, 
 * it creates a new stripe customer and puts it into Supabase.
 *
 * @param email supabase email
 * @param uuid supabase uuid
 *
 * @return stripe customer id
 */
export async function ensureCustomer(email: string, uuid: string): Promise<string> {
	const { data, error } = await supabaseAdmin
		.from("customers")
		.select("stripe_customer_id")
		.eq("id", uuid)
		.single();

	if (error || !data?.stripe_customer_id) {
		const stripeCustomer = await stripe.customers.create({
			metadata: { id: uuid },
			email: email,
		});
		const { error } = await supabaseAdmin
			.from("customers")
			.insert([{ 
				id: uuid, 
				stripe_customer_id: stripeCustomer.id 
			}]);
		if (error) {
			throw error;
		}
		console.log(`New customer created and inserted for ${uuid}`);
		return stripeCustomer.id;
	} 
	return data.stripe_customer_id;
};

/**
 * This function handles copying customer details on Stripe and Supabase.
 * 
 * It checks that name, phone, address are on the payment method.
 * If not, it returns.
 * 
 * Otherwise it updates the customer on Stripe and updates the user on Supabase.
 * It throws the error if an Supabase update error occurs.
 *
 * @param id Supabase user id
 * @param payment_method Stripe payment method
 */
async function syncCustomerDetails(id: string, payment_method: Stripe.PaymentMethod) {
	const billingDetails = payment_method.billing_details;
	if (!billingDetails.name || !billingDetails.phone || !billingDetails.address) {
		return;
	}

	await stripe.customers.update(payment_method.customer as string, {
		name: billingDetails.name,
		phone: billingDetails.phone,
		address: billingDetails.address as Stripe.AddressParam,
	});

	const update = await supabaseAdmin
		.from("users")
		.update({
			billing_address: { ...billingDetails.address },
			payment_method: { ...payment_method[payment_method.type] },
		})
		.eq("id", id);

	if (update.error) {
		throw update.error;
	}
};

/**
 * This function handles Stripe subscription changes for a customer.
 * 
 * It gets the user from Supabase. 
 * It throws the error if an error in finding user is recieved.
 * 
 * It gets the subscription from Stripe and upserts the change into Supabase.
 * It throws the error if upsert error is recieved.
 * 
 * It checks if `createAction` is specified. 
 * If so, it syncs the data across Supabase and Stripe.
 * 
 * @param subscriptionId stripe subscription id
 * @param customerId stripe customer id
 * @param createAction flag whether to sync the data
 */
export async function onSubscriptionChange(
	subscriptionId: string, 
	customerId: string, 
	createAction: boolean = false
) {
	const result = await supabaseAdmin.from("customers").select("id").eq("stripe_customer_id", customerId).single();
	if (result.error) {
		throw result.error;
	}

	const id = result.data.id;
	const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ["default_payment_method"] });
	const subscriptionData: Database["public"]["Tables"]["subscriptions"]["Insert"] = {
		id: subscription.id,
		user_id: id,
		metadata: subscription.metadata,
		status: subscription.status as Database["public"]["Enums"]["subscription_status"],
		price_id: subscription.items.data[0].price.id,
		quantity: 1, // subscription.quantity,
		cancel_at_period_end: subscription.cancel_at_period_end,
		cancel_at: formatDate(subscription.cancel_at),
		canceled_at: formatDate(subscription.canceled_at),
		current_period_start: formatDate(subscription.current_period_start)!,
		current_period_end: formatDate(subscription.current_period_end)!,
		created: formatDate(subscription.created)!,
		ended_at: formatDate(subscription.ended_at),
		trial_start: formatDate(subscription.trial_start),
		trial_end: formatDate(subscription.trial_end)
	};
	console.log("subscription: " + JSON.stringify(subscriptionData,null,2));
	const upsert = await supabaseAdmin.from("subscriptions").upsert([subscriptionData]);
	if (upsert.error) {
		throw upsert.error;
	}
	console.log(`Inserted/updated subscription [${subscription.id} for ${id}]`);
	if (createAction && subscription.default_payment_method && id) {
		await syncCustomerDetails(id, subscription.default_payment_method as Stripe.PaymentMethod);
	}
};
