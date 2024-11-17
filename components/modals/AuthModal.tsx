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
import { Figtree } from "next/font/google";

const font = Figtree({ subsets: ["latin"] });

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
			{/* <input className="hover:outline-1/> */}
			<Auth
				theme="dark"
				magicLink={true}
				providers={["google", "github"]}
				supabaseClient={supabaseClient}
				socialLayout={"horizontal"}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: "var(--main)",
								brandAccent: "var(--main-darken)",
								messageBackground: "var(--main)",
								messageText: "var(--main)",
								messageTextDanger: "var(--warn)",
								messageBackgroundDanger: "var(--warn)",
								messageBorderDanger: "var(--warn)"
							},
							fonts: {
								bodyFontFamily: font.style.fontFamily,
								buttonFontFamily: font.style.fontFamily,
								inputFontFamily: font.style.fontFamily,
								labelFontFamily: font.style.fontFamily,
							},
							radii: {
								borderRadiusButton: "24px",
								// inputBorderRadius: "24px"
							},
							fontSizes: {
								baseBodySize: "12px",
								baseInputSize: "16px",
								baseLabelSize: "16px",
								baseButtonSize: "16px"
							}
						},
					},
					className: {
						button: "font-medium rounded-full",
						anchor: "font-medium",
						input: "font-medium rounded-full",
						label: "font-medium hover:outline-white hover:outline-2",
						message: "font-medium",
					}
				}}
			/>
		</Modal>
	);
};

export default AuthModal;
