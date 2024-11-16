"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/modals/Modal";
import {
	useSessionContext,
	useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/modals/useAuthModal";
import { useEffect } from "react";

/**
 * This component handles displaying the login and register form.
 * 
 * It renders the social logins with `Google` and `Github`.
 * 
 * It renders inputs for email address and password on login or register mode
 * and a sign in / sign up button.
 * 
 * On login mode, it shows a link to login using magic link email.
 * On login mode, it shows a link to reset password.
 */
const AuthModal = () => {
	const supabaseClient = useSupabaseClient();
	const { session } = useSessionContext();

	const router = useRouter();
	const { onClose, isOpen } = useAuthModal();

	useEffect(() => {
		if (session) {
			router.refresh();
			onClose();
		}
	}, [session, router, onClose]);

	function onChange() {
		if (isOpen) {
			onClose();
		}
	};

	return (
		<Modal
			title="Welcome back"
			description="Login to your account"
			isOpen={isOpen}
			onChange={onChange}
		>
			<Auth
				theme="dark"
				magicLink={true}
				providers={["google", "github"]}
				supabaseClient={supabaseClient}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: "#404040",
								brandAccent: "#22c55e",
							},
						},
					},
				}}
			/>
		</Modal>
	);
};

export default AuthModal;
