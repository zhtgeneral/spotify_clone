"use client";

import { Database } from "@/app/types/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
	const [supabaseClient] = useState(() =>
		createClientComponentClient<Database>()
	);

	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			{children}
		</SessionContextProvider>
	);
};

export default SupabaseProvider;
