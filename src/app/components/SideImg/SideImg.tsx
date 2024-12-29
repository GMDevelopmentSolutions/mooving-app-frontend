import type { FC } from "react";
import styles from "./SideImg.module.scss";
import Image from "next/image";

const SideImg: FC = ({}) => {
	return (
		<div className={styles.sideContainer}>
			<Image
				src="/c4d5b5c387c7540e43dd5828c5f5f850.jpeg"
				alt="logo"
				width={100}
				height={100}
			/>
		</div>
	);
};
export default SideImg;
