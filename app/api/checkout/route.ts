import { stripe } from "@/app/libs/stripe";
import { ensureCustomer } from "@/app/libs/supabaseAdmin";
import { getURL } from "@/app/utils/getUrl";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

/**
 * This endpoint handles creating a Stripe checkout session.
 * 
 * It gets the user using supabase auth.
 * It returns a `401` response if the authentication error occurs.
 * 
 * Otherwise it ensures there is a customer record in the database 
 * for the corresponding user.
 * 
 * It then creates a Stripe checkout session with appropriate callback urls
 * and returns the session id with a `200` response.
 * 
 * If any other error occurs, it returns a `500` error for `Internal Error`.
 */
export async function POST(request: Request) {
  try {
    const { price, quantity = 1, metadata = {} } = await request.json();
    
    // Create a new supabase client for each request
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const customerId = await ensureCustomer(user.email!, user.id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer: customerId,
      line_items: [
        {
          price: price.id,
          quantity
        }
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        metadata
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}