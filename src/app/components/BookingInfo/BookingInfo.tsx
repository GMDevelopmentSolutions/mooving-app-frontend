import type { FC } from "react";
import Button from "../Button/Button";
import styles from "./BookingInfo.module.scss";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import { IInventorsItems } from "@/interface/interface";

interface BookingInfoProps {
	onFeedbackFormOpen: () => void;
	sendOrder: () => void;
	inventorsIsPending: boolean;
	items: IInventorsItems[];
	isComplete: boolean;
}

const BookingInfo: FC<BookingInfoProps> = ({
	onFeedbackFormOpen,
	sendOrder,
	inventorsIsPending,
	items,
	isComplete,
}) => {
	const calculateVolumes = (items: IInventorsItems[]) => {
		return items?.map(item => {
			const lengthInMeters = item.length / 100;
			const widthInMeters = item.width / 100;
			const heightInMeters = item.height / 100;

			const volume = lengthInMeters * widthInMeters * heightInMeters;

			const totalVolume = volume * item.quantity;

			return {
				id: item.id,
				volume: totalVolume,
			};
		});
	};

	const volumes = calculateVolumes(items);

	const totalVolume = volumes?.reduce((sum, item) => sum + item.volume, 0);

	return (
		<>
			<div className={styles.containerBookingInfo}>
				<h3 className={styles.title}>Rate details</h3>
				<ul className={styles.list}>
					<li className={styles.item}>
						<span className={styles.spanText}>Per hr for labor</span>
						<span className={styles.spanPrice}>${`${totalVolume * 5}`}</span>
					</li>
					<li className={styles.item}>
						<span className={styles.spanText}>One-time truck and gas fee</span>
						<span className={styles.spanPrice}>${`${totalVolume * 5}`}</span>
					</li>
				</ul>
				<span className={styles.spanTextInfo}>
					<SpriteSVG href="icon-info" color="#F3AF28" />
					Full furniture disassembly and assembly service are included in the total
					price.
				</span>
			</div>
			<div className={styles.containerTotal}>
				<span className={styles.spanTotalTitle}>Total costs for 3 hrs</span>
				<span className={styles.spanTotalPrice}>${`${totalVolume * 5}`}</span>
			</div>
			<div className={styles.buttonContainer}>
				<Button
					disabled={isComplete ?? inventorsIsPending}
					onClick={sendOrder}
					buttonClass="buttonGreen"
					className={styles.buttonGreen}
				>
					{isComplete ? "Confirm and proceed deposit" : "Book now "}
				</Button>
				{!isComplete && <Button buttonClass="buttonWhite">Cancel booking</Button>}
			</div>
			{!isComplete && (
				<button
					onClick={onFeedbackFormOpen}
					type="button"
					className={styles.linkTel}
				>
					<SpriteSVG href="icon-call" color="#531BAF" /> Shedule a call with account
					manager
				</button>
			)}
		</>
	);
};
export default BookingInfo;
