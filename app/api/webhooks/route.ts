import { stripe } from "@/libs/stripe";
import { HttpStatusCode } from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { syncDataSupabase } from "./syncData";

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
			await syncDataSupabase(event);
		} catch (error: any) {
			console.log(error);
			return new NextResponse("Webhook Error", { status: HttpStatusCode.BadRequest });
		}
	}
	return NextResponse.json({ received: true }, { status:  HttpStatusCode.Ok });
}