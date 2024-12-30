"use client";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import styles from "./Logout.module.scss";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import { useLogoutMutation } from "@/hook/useLogoutMutation";
interface LogoutProps {
	color?: string;
}

const Logout: FC<LogoutProps> = ({ color }) => {
	const router = useRouter();

	const { mutate: logout } = useLogoutMutation();

	const handleRedirect = () => {
		logout();
		router.push("/login");
	};
	return (
		<button
			onClick={handleRedirect}
			className={styles.button}
			style={{ color: color }}
		>
			<SpriteSVG href="icon-logout" />
			<span>Log out</span>
		</button>
	);
};
export default Logout;
