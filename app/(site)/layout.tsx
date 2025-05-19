import getActiveProductsWithPrices from "@/app/actions/getActiveProductsWithPrices";
import getSongsByUserId from "@/app/actions/getSongByUserId";
import PlayerController from "@/app/components/Player/PlayerController";
import ModalProvider from "@/app/providers/ModalProvider";
import SupabaseProvider from "@/app/providers/SupabaseProvider";
import UserProvider from "@/app/providers/UserProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import "./globals.css";
import ToasterProvider from "@/app/providers/ToasterProvider";
import SideBar from '@/app/components/Sidebar/Sidebar';
import { font } from './font';

console.log("font layout: " + JSON.stringify(font, null, 2));

// const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spotify Clone",
	description: "Listen to music",
};

/** This is used to disable caching */
export const revalidate = 0;

/**
 * This component provides access to all needed hooks
 */
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userSongs = await getSongsByUserId();
	const products = await getActiveProductsWithPrices();
	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider products={products} />
						<SideBar songs={userSongs}>{children}</SideBar>
						<PlayerController />
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	);
}
