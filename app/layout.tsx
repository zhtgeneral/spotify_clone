import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getSongsByUserId from "@/actions/getSongByUserId";
import PlayerController from "@/components/Player/PlayerController";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SideBar from "../components/Sidebar/Sidebar";
import ToasterProvider from "../providers/ToasterProvider";
import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

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
