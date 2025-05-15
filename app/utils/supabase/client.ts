
import { createBrowserClient } from "@supabase/ssr";

/**
 * Use this version of supabase in client components.
 * 
 * This already uses singleton pattern.
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
