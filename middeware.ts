import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * This middleware handles all requests that come through.
 * 
 * It gets the most recent user session from Supabase Auth.
 * Then it passes the updated cookie in the response.
 */
export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({
		req: req,
		res: res,
	});
	await supabase.auth.getSession();
	return res;
}
