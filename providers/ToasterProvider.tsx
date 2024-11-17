"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
	return (
		<Toaster
			toastOptions={{
				success: {
					iconTheme: {
						primary: "var(--main)",
						secondary: "black"
					},
					ariaProps: {
						role: "alert",
						"aria-live": "off"
					}
				},
				duration: 2000,
				style: {
					background: "#333",
					color: "#fff",
				},
			}}
		/>
	);
};

export default ToasterProvider;
