"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./style/_global.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>{children}</Provider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
