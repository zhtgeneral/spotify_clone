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
 * returns the stripe id of the user given the email and supabase uuid.
 * throws error if the stripe user can't be found in supabase
 *  
 * @param email supabase email
 * @param uuid supabase uuid
 * 
 * @return id stripe id
 */
const createOrRetrieveACustomer = async (email: string, supabaseUUID: string) => {
  const { data: supabaseData, error: supabaseError }
   = await supabaseAdmin.from('customers').select('stripe_customer_id').eq('id', supabaseUUID).single()

  if (supabaseError || !supabaseData?.stripe_customer_id) {
    const customerData: {
      metadata: { supabaseUUID: string }; 
      email?: string 
    } = {
      metadata: { supabaseUUID: supabaseUUID },
      email: email,
    }
    const stripeCustomer = await stripe.customers.create(customerData);
    const { error: supabaseError } = await supabaseAdmin.from('customers').insert([{ id: supabaseUUID, stripe_customer_id: stripeCustomer.id }])
    if (supabaseError) throw supabaseError;
    console.log(`New customer created and inserted for ${supabaseUUID}`)
    return stripeCustomer.id;

  } else return supabaseData.stripe_customer_id
}

/** 
 * Update stripe user given supabase user id and stripe payment method
 *  
 * @param supabaseUUID string
 * @param payment_method Stripe.PaymentMethod object
 */
const copyBillingDetailsToCustomer = async (supabaseUUID: string, payment_method: Stripe.PaymentMethod) => {
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  
  await stripe.customers.update(payment_method.customer as string, { name, phone, address: address as Stripe.AddressParam });

  const { error } = await supabaseAdmin.from('users').update({
    billing_address: { ...address },
    payment_method: { ...payment_method[payment_method.type] }
  }).eq('id', supabaseUUID);

  if (error) throw error;
}

/**
 * from stripe, add a subscription for a user onto supabase
 * @param stripeSubscriptionId 
 * @param stripeCustomerId 
 * @param createAction 
 */
const manageSubscriptionStatusChange = async (stripeSubscriptionId: string, stripeCustomerId: string, createAction = false) => {
  const { data: supabaseCustomer, error: noCustomerError } 
  = await supabaseAdmin.from('customers').select('id').eq('stripe_customer_id', stripeCustomerId).single();
  if (noCustomerError) throw noCustomerError;

  const { id: supabaseCustomerUUID } = supabaseCustomer!;
  const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId, { expand: ['default payment method'] })
  
  const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] = {
    id:                   stripeSubscription.id,
    user_id:              supabaseCustomerUUID,
    metadata:             stripeSubscription.metadata,
    //@ts-ignore
    status:               stripeSubscription.status,
    // status: subscription.status as Database["public"]["Enums"]["subscription_status"],
    price_id:             stripeSubscription.items.data[0].price.id,
    // @ts-ignore
    quantity:             stripeSubscription.quantity,
    cancel_at_period_end: stripeSubscription.cancel_at_period_end,
    cancel_at:            stripeSubscription.cancel_at   ? toDateTime(stripeSubscription.cancel_at).  toISOString(): null,
    canceled_at:          stripeSubscription.canceled_at ? toDateTime(stripeSubscription.canceled_at).toISOString(): null,
    current_period_start: toDateTime(stripeSubscription.current_period_start).toISOString(),
    current_period_end:   toDateTime(stripeSubscription.current_period_end).  toISOString(),
    created:              toDateTime(stripeSubscription.created).             toISOString(),
    ended_at:             stripeSubscription.ended_at    ? toDateTime(stripeSubscription.ended_at).   toISOString() : null,
    trial_start:          stripeSubscription.trial_start ? toDateTime(stripeSubscription.trial_start).toISOString() : null,
    trial_end:            stripeSubscription.trial_end   ? toDateTime(stripeSubscription.trial_end).  toISOString() : null
  }

  const { error: supabaseError } = await supabaseAdmin.from('subscriptions').upsert([subscriptionData])
  if (supabaseError) throw supabaseError;
  console.log(`Inserted/updated subscription [${stripeSubscription.id} for ${supabaseCustomerUUID}]`)
  if (createAction && stripeSubscription.default_payment_method && supabaseCustomerUUID) {
    await copyBillingDetailsToCustomer(supabaseCustomerUUID, stripeSubscription.default_payment_method as Stripe.PaymentMethod)
  }
}

export { upsertPriceRecord, upsertProductRecord, createOrRetrieveACustomer, manageSubscriptionStatusChange }