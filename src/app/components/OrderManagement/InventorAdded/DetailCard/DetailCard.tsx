import type { FC } from "react";
import styles from "./DetailCard.module.scss";
// import AttachFile from "@/app/components/AttachFile/AttachFile";
import { IInventorsItems } from "@/interface/interface";
interface IDetailCardProps {
	inventor: IInventorsItems;
}

const DetailCard: FC<IDetailCardProps> = ({
	inventor: { width, height, length, name, weight },
}) => {
	return (
		<>
			<div className={styles.infoContainer}>
				<div className={styles.infoWrap}>
					<span className={styles.infoTitle}>{name}</span>
					{/* <AttachFile /> */}
				</div>
				<ul className={styles.infoList}>
					<li className={styles.infoItem}>
						<span>
							Width<span className={styles.infoSpan}> (ft)</span>
						</span>

						<span className={styles.infoSpan}>{width}</span>
					</li>
					<li className={styles.infoItem}>
						<span>
							Height <span className={styles.infoSpan}> (inch)</span>
						</span>
						<span className={styles.infoSpan}>{height}</span>
					</li>
					<li className={styles.infoItem}>
						<span>
							Width <span className={styles.infoSpan}> (ft)</span>
						</span>
						<span className={styles.infoSpan}>{length}</span>
					</li>
					<li className={styles.infoItem}>
						<span>
							Weight <span className={styles.infoSpan}>(inch)</span>
						</span>
						<span className={styles.infoSpan}>{weight}</span>
					</li>
				</ul>
			</div>
		</>
	);
};
export default DetailCard;
