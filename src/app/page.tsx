"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./components/Loader/Loader";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push("/login");
	}, [router]);

	return (
		<main>
			<Loader />
		</main>
	);
}
