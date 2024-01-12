import { Database } from "@/types_db";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { Price, Product } from "@/types";
import { stripe } from "@/libs/stripe";
import { toDateTime } from "./helpers";

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

/** 
 * Takes the info from the stripe product and upserts it into supabase
 * assumes supabase end has correct columns
 *  
 * @param product - Stripe.Product
 */
const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description as string,
    image: product.images?.[0],
    metadata: product.metadata
  }
  const { error: supabaseError } = await supabaseAdmin.from('products').upsert([productData]);
  if (supabaseError) throw supabaseError;
  console.log(`Product inserted/updated: ${product.id}`);
}

/** 
 * Takes the info from the stripe price and upserts it into supabase
 * assumes supabase end has correct columns
 *  
 * @params price - Stripe.Price
 */
const upsertPriceRecord = async (price: Stripe.Price) => {
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
  }

  const { error: supabaseError } = await supabaseAdmin.from('prices').upsert([priceData])
  if (supabaseError) throw supabaseError
  console.log(`Price inserted/updated: ${price.id}`)
}

/** 
 * Gets the stripe id of the user given the email and uuid.
 * throws error if the stripe user can't be found in supabase
 *  
 * @param email supabase email
 * @param uuid supabase uuid
 * 
 * @return id stripe id
 */
const createOrRetrieveACustomer = async (email: string, uuid: string) => {
  const { data: supabaseData, error: supabaseError } = await supabaseAdmin.from('customers').select('stripe_customer_id').eq('id', uuid).single()

  if (supabaseError || !supabaseData?.stripe_customer_id) {
    const customerData: {
      metadata: { supabaseUUID: string }; 
      email?: string 
    } = {
      metadata: { supabaseUUID: uuid },
      email: email,
    }
    const stripeCustomer = await stripe.customers.create(customerData);
    const { error: supabaseError } = await supabaseAdmin.from('customers').insert([{ id: uuid, stripe_customer_id: stripeCustomer.id }])
    if (supabaseError) throw supabaseError;
    console.log(`New customer created and inserted for ${uuid}`)
    return stripeCustomer.id;

  } else return supabaseData.stripe_customer_id
}

/** 
 * Gets the stripe id of the user given the email and uuid.
 * throws error if the stripe user can't be found in supabase
 *  
 * @param uuid supabase user id
 * @param payment_method a Stripe.PaymentMethod object
 */
const copyBillingDetailsToCustomer = async ( uuid: string, payment_method: Stripe.PaymentMethod) => {
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  
  await stripe.customers.update(payment_method.customer as string, { name, phone, address: address as Stripe.AddressParam });

  const { error } = await supabaseAdmin.from('users').update({
    billing_address: { ...address },
    payment_method: { ...payment_method[payment_method.type] }
  }).eq('id', uuid);

  if (error) throw error;
}

/**
 * from supabase admin subscription id, add a subscription for a user onto supabase
 * @param subscriptionId 
 * @param customerId 
 * @param createAction 
 */
const manageSubscriptionStatusChange = async (subscriptionId: string, customerId: string, createAction = false) => {
  const { data: customerData, error: noCustomerError } = await supabaseAdmin.from('customers').select('id').eq('stripe_customer_id', customerId).single();
  if (noCustomerError) throw noCustomerError;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ['default payment method'] })
  
  const { id: uuid } = customerData;
  const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status as Database["public"]["Enums"]["subscription_status"],
    price_id: subscription.items.data[0].price.id,
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString(): null,
    canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString(): null,
    current_period_start: toDateTime(subscription.current_period_start).toISOString(),
    current_period_end: toDateTime(subscription.current_period_end).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
    trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
    trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null
  }

  const { error } = await supabaseAdmin.from('subscriptions').upsert([subscriptionData])
  if (error) throw error;
  console.log(`Inserted/updated subscription [${subscription.id} for ${uuid}]`)
  if (createAction && subscription.default_payment_method && uuid) {
    await copyBillingDetailsToCustomer(uuid, subscription.default_payment_method as Stripe.PaymentMethod)
  }
}

export { upsertPriceRecord, upsertProductRecord, createOrRetrieveACustomer, manageSubscriptionStatusChange }