import { onSubscriptionChange, upsertPriceRecord, upsertProductRecord } from "@/app/libs/supabaseAdmin";
import Stripe from "stripe";

export const relevantEvents = new Set([
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
 * 
 * @requires function name starts with an underscore so Next.js build doesn't interpret it as a handler.
 */
export async function handleStripeEvent(event: Stripe.Event) {
  if (!relevantEvents.has(event.type)) {
    return;
  }

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
        await onSubscriptionChange(
          subscriptionId as string,
          checkoutSession.customer as string,
          true
        );
      }
      break;
    default:
      throw new Error("Unhandled relevant event");
  }
}