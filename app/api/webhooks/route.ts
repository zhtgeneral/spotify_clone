import { stripe } from "@/libs/stripe";
import {
	onSubscriptionChange,
	upsertPriceRecord,
	upsertProductRecord,
} from "@/libs/supabaseAdmin";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { HttpStatusCode } from "axios";

const relevantEvents = new Set([
	"product.created",
	"product.updated",
	"price.created",
	"price.updated",
	"checkout.session.completed",
	"customer.subscription.created",
	"customer.subscription.updated",
	"customer.subscription.deleted",
]);

/**
 * This endpoint creates a webhook that allows Stripe Dashboard to recieve events.
 * @usecase monitoring Stripe events on denied payments, subscription changes, etc.
 * 
 * It checks if signature and webhook secret are are specified. 
 * If not, it returns.
 * 
 * It constructs a Stripe webhook event using the body of the request, signature, and webhook secret.
 * 
 * If the event type is one of the specied events, it handles it accordingly.
 * 
 * Then it returns a `200` response for `Ok`.
 * 
 */
export async function POST(request: Request) {
	const body = await request.text();
	const signature = headers().get("Stripe-Signature");
	
	let event: Stripe.Event;
	try {
		const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
		if (!signature || !webhookSecret) {
			return;
		}
		event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
	} catch (error: any) {
		console.log(`Error message: ${error.message}`);
		return new NextResponse(`Webhook Error: ${error.message}`, { status: HttpStatusCode.BadRequest });
	}

	if (relevantEvents.has(event.type)) {
		try {
			syncDataSupabase(event);
		} catch (error: any) {
			console.log(error);
			return new NextResponse("Webhook Error", { status: HttpStatusCode.BadRequest });
		}
	}
	return NextResponse.json({ received: true }, { status:  HttpStatusCode.Ok });
}

/**
 * This function handles the Stripe webhook events.
 * 
 * If the type is product related, it upserts the product into Supabase.
 * 
 * If the type is price related, it upserts the price into Supabase.
 * 
 * If the type is customer related, it ensure the customers is on Supabase.
 * 
 * If the type is checkout and subscription related, it uploads the change into Supabase.
 * 
 * If the type is not supported, it throws an error.
 */
async function syncDataSupabase(event: Stripe.Event) {
	switch (event.type) {
		case "product.created":
		case "product.updated":
			await upsertProductRecord(event.data.object);
			break;
		case "price.created":
		case "price.updated":
			await upsertPriceRecord(event.data.object);
			break;
		case "customer.subscription.created":
		case "customer.subscription.updated":
		case "customer.subscription.deleted":
			const subscription = event.data.object;
			await onSubscriptionChange(
				subscription.id,
				subscription.customer as string,
				event.type === "customer.subscription.created"
			);
			break;
		case "checkout.session.completed":
			const checkoutSession = event.data.object;
			if (checkoutSession.mode === "subscription") {
				const subscriptionId = checkoutSession.subscription;
				const createAction = true;
				await onSubscriptionChange(
					subscriptionId as string,
					checkoutSession.customer as string,
					createAction
				);
			}
			break;
		default:
			throw new Error("Unhandled relevant event");
	}
}
