"use client";

import type { FC } from "react";
import styles from "./InventorAdded.module.scss";
import Button from "../../Button/Button";
import MessageBlock from "../../MessageBlock/MessageBlock";
import { useRouter } from "next/navigation";
import DetailCardList from "./DetailCardList/DetailCardList";
import ImageCardList from "./ImageCardList/ImageCardList";
import SpriteSVG from "../../SpriteSVG/SpriteSVG";
import useWindowWidth from "@/hook/useWindowWidth";
import { IInventorsItems } from "@/interface/interface";

interface InventorAddedProps {
	isComplete: boolean;
	inventors: IInventorsItems[];
}

const InventorAdded: FC<InventorAddedProps> = ({ isComplete, inventors }) => {
	const router = useRouter();
	const isMobile = useWindowWidth(490);

	const handleRedirect = () => {
		router.push(`/inventor`);
	};

	return (
		<div className={styles.inventorAdded}>
			<div className={styles.hederInfo}>
				<h3 className={styles.title}>Inventor added</h3>
				<span className={styles.totalItems}>
					Total items: <span className={styles.number}>{inventors.length}</span>
				</span>
			</div>

			<div className={styles.counterWrapper}>
				<ImageCardList inventors={inventors} />
				<DetailCardList inventors={inventors} />
			</div>
			{!isComplete && (
				<div className={styles.buttonContainer}>
					<Button
						buttonClass="buttonWhite"
						className={styles.buttonWhite}
						onClick={handleRedirect}
					>
						{isMobile && (
							<SpriteSVG
								href="icon-add_home_work"
								color="#F3AF28"
								width={22}
								height={20}
							/>
						)}
						Add inventory
					</Button>
					<MessageBlock>
						We recommend provide some inventory details or space pictures.
					</MessageBlock>
				</div>
			)}
		</div>
	);
};
export default InventorAdded;
