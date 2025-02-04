// export const dynamic = 'force-dynamic';

// import { stripe } from "@/libs/stripe";
// import { ensureCustomer } from "@/libs/supabaseAdmin";
// import { getURL } from "@/utils/getUrl";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { UserResponse } from "@supabase/supabase-js";
// import { HttpStatusCode } from "axios";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// /**
//  * This endpoint handles creating a Stripe checkout session.
//  * 
//  * It gets the user using supabase auth.
//  * It returns a `401` response if the authentication error occurs.
//  * It returns a `404` response if the user cannot be found.
//  * 
//  * Otherwise it ensures there is a customer record in the database 
//  * for the corresponding user.
//  * 
//  * It then creates a Stripe checkout session with appropriate callback urls
//  * and returns the session id with a `200` response.
//  * 
//  * If any other error occurs, it returns a `500` error for `Internal Error`.
//  */
// export async function POST(request: Request) {
// 	const { price, quantity = 1, metadata = {} } = await request.json();

// 	try {
// 		const supabase = createRouteHandlerClient({ cookies });
// 		const userResponse: UserResponse = await supabase.auth.getUser();
// 		if (userResponse.error) {
// 			return new NextResponse("Authentication Error", { status: HttpStatusCode.Unauthorized })
// 		}
// 		const user = userResponse.data.user;
// 		if (!user) {
// 			return new NextResponse("User could not be found", { status: HttpStatusCode.NotFound });
// 		}

// 		const customerId: string = await ensureCustomer(user.email!, user.id);
// 		const session = await stripe.checkout.sessions.create({
// 			payment_method_types: ["card"],
// 			billing_address_collection: "required",
// 			customer: customerId,
// 			line_items: [{ price: price.id, quantity }],
// 			mode: "subscription",
// 			allow_promotion_codes: true,
// 			subscription_data: {
// 				metadata: metadata,
// 			},
// 			success_url: `${getURL()}/account`,
// 			cancel_url: `${getURL()}`,
// 		});
// 		return NextResponse.json({ url: session.url });
// 	} catch (error: any) {
// 		console.log(error);
// 		return new NextResponse("Internal Error", { status: HttpStatusCode.InternalServerError });
// 	}
// }


import { stripe } from "@/libs/stripe";
import { ensureCustomer } from "@/libs/supabaseAdmin";
import { getURL } from "@/utils/getUrl";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

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