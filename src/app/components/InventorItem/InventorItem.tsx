import type { FC } from "react";
import styles from "./InventorItem.module.scss";
import Image from "next/image";
import { InventorItemProps } from "@/interface/interface";

const InventorItem: FC<InventorItemProps> = ({ src, text, onClick }) => {
	return (
		<li className={styles.item}>
			<button className={styles.button} type="button" onClick={onClick}>
				<Image className={styles.img} src={src} alt="logo" width={70} height={70} />
				<span className={styles.text}>{text}</span>
			</button>
		</li>
	);
};
export default InventorItem;
