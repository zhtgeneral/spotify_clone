"use client";

import useAuthModal from "@/app/hooks/modals/useAuthModal";
import {
	useSessionContext,
	useSupabaseClient,
} from "@supabase/auth-helpers-react";

import Modal from "@/app/components/modals/Modal";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import React from "react";
import { Figtree } from "next/font/google";

interface AuthModalProps {
	/** set this to true in component tests for mocking, otherwise leave out */
	debugging?: boolean
}

/** Commented out font because it doesn't load in storybook */
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
 * 
 * Note: The rest of the project uses modern server/browser supabase client,
 * but this component will have to use the outdated version.
 * 
 * @requires CSS variables needs to be set with a variable for --main-darken, -main, --darken
 */
export default function AuthModal({
	debugging = false
}: AuthModalProps) {	
	const supabaseClient = useSupabaseClient();
	const { session } = useSessionContext();

	const router = useRouter();
	const { onClose, isOpen } = useAuthModal();

	React.useEffect(() => {
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
			isOpen={isOpen || debugging}
			onChange={onChange}
		>
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
								/** keep commented out until fonts can be mocked in storybook */
								bodyFontFamily: font.style.fontFamily,
								buttonFontFamily: font.style.fontFamily,
								inputFontFamily: font.style.fontFamily,
								labelFontFamily: font.style.fontFamily,
							},
							radii: {
								borderRadiusButton: "24px",
								inputBorderRadius: "24px"
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