import Image from "next/image";
import type { FC } from "react";
import styles from "./ImageCard.module.scss";
import SpriteSVG from "@/app/components/SpriteSVG/SpriteSVG";

const ImageCard: FC = ({}) => {
	return (
		<div className={styles.counterPrevue}>
			<div className={styles.preview}>
				<Image
					src="/c4d5b5c387c7540e43dd5828c5f5f850.jpeg"
					alt="logo"
					width={82}
					height={82}
				/>
			</div>
			<span className={styles.previewTitle}>Lorem ipsum dolor sit </span>
			<button className={styles.btnDelete}>
				<SpriteSVG href="icon-delete" width={18} height={21} />
			</button>
		</div>
	);
};
export default ImageCard;
