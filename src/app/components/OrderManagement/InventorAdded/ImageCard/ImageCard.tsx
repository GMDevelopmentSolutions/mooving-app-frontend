import Image from "next/image";
import type { FC } from "react";
import styles from "./ImageCard.module.scss";
// import SpriteSVG from "@/app/components/SpriteSVG/SpriteSVG";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IImageCardProps {
	photoPath: string[];
	name: string;
}

const ImageCard: FC<IImageCardProps> = ({ photoPath, name }) => {
	if (!photoPath || photoPath.length === 0) {
		return null;
	}

	const { href } = new URL(`/uploads/${photoPath[0]}`, apiUrl);

	return (
		<div className={styles.counterPrevue}>
			<div className={styles.preview}>
				<Image src={href} alt="logo" width={82} height={82} />
			</div>
			<span className={styles.previewTitle}>{name} </span>
			{/* <button className={styles.btnDelete}>
				<SpriteSVG href="icon-delete" width={18} height={21} />
			</button> */}
		</div>
	);
};
export default ImageCard;
