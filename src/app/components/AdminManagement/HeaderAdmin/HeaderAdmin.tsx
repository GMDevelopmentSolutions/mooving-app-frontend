import type { FC } from "react";
import styles from "./HeaderAdmin.module.scss";
import Image from "next/image";
import Logout from "../../Logout/Logout";

const HeaderAdmin: FC = ({}) => {
	return (
		<div className={styles.headerAdmin}>
			<Image src="/logo.png" alt="logo" width={131} height={103} />
			<Logout color="black" />
		</div>
	);
};
export default HeaderAdmin;
