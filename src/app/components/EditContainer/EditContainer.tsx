"use client";

import { useRouter } from "next/navigation";
import styles from "./EditContainer.module.scss";
import Button from "../Button/Button";

const EditContainer = () => {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<h3>Hi Its Dave</h3>
			<p>
				thank you for your business, please fill up the final details about your
				move
			</p>
			<Button
				onClick={() => {
					router.push("/editprofile");
				}}
				buttonClass="buttonGreen"
				className={styles.button}
			>
				Edit Container
			</Button>
		</div>
	);
};

export default EditContainer;
