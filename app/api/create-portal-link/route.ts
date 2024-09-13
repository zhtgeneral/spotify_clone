import { getURL } from "@/libs/helpers";
import { stripe } from "@/libs/stripe";
import { createOrRetrieveACustomer } from "@/libs/supabaseAdmin";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	// uses auth helpers next js docs
	try {
		const supabase = createRouteHandlerClient({ cookies });

		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) throw new Error("could not get user");

		const customer = await createOrRetrieveACustomer(
			user.id as string,
			user.email as string
		);
		if (!customer) throw Error("could not get customer");

		const { url } = await stripe.billingPortal.sessions.create({
			customer,
			return_url: `${getURL()}/account`,
		});
		return NextResponse.json({ url });
	} catch (error: any) {
		console.log(error);
		return new NextResponse("Internal error");
	}
}
