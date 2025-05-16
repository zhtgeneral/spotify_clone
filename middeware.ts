import { NextRequest } from "next/server";
import { updateSession } from '@/app/utils/supabase/middleware'

/**
 * This middleware handles all requests that come through.
 * 
 * It gets the most recent user session from Supabase Auth.
 * Then it passes the updated cookie in the response.
 */
export async function middleware(request: NextRequest) {
	return await updateSession(request);
}
