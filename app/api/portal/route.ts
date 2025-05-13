export const dynamic = 'force-dynamic';

import { stripe } from "@/app/libs/stripe";
import { ensureCustomer } from "@/app/libs/supabaseAdmin";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { UserResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { getURL } from "@/app/utils/getUrl";
/**
 * This endpoint handles creating a Stripe billing portal session.
 * 
 * It gets the user using supabase auth.
 * It returns a `401` response if the authentication error occurs.
 * It returns a `404` response if the user cannot be found.
 * 
 * Otherwise it ensures there is a customer record in the database 
 * for the corresponding user.
 * 
 * It then creates a Stripe billing portal session with appropriate callback urls
 * and returns the url of the billing portal with a `200` response.
 * 
 * If any other error occurs, it returns a `500` response for `Internal Error`.
 */
export async function POST(request: Request) {
	try {
		const supabase = createRouteHandlerClient({ cookies });
		const userResponse: UserResponse = await supabase.auth.getUser();
		if (userResponse.error) {
			return new NextResponse("Authentication Error", { status: HttpStatusCode.Unauthorized });
		}
		const user = userResponse.data.user;
		if (!user) {
			return new NextResponse("User could not be found", { status: HttpStatusCode.NotFound });
		}
		const customerId: string = await ensureCustomer(user.email!, user.id);
		const session = await stripe.billingPortal.sessions.create({
			customer: customerId,
			return_url: `${getURL()}/account`,
		});
		return NextResponse.json({ url: session.url }, { status: HttpStatusCode.Ok });
	} catch (error: any) {
		console.log(error);
		return new NextResponse("Internal error");
	}
}