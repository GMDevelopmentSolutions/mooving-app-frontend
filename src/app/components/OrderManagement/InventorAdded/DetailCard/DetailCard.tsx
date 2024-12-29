import type { FC } from "react";
import styles from "./DetailCard.module.scss";
import AttachFile from "@/app/components/AttachFile/AttachFile";
const DetailCard: FC = ({}) => {
	return (
		<>
			<div className={styles.infoContainer}>
				<div className={styles.infoWrap}>
					<span className={styles.infoTitle}>Attachments</span>
					<AttachFile />
				</div>
				<ul className={styles.infoList}>
					<li className={styles.infoItem}>
						<span>
							Width<span className={styles.infoSpan}> (ft)</span>
						</span>

						<span className={styles.infoSpan}>45</span>
					</li>
					<li className={styles.infoItem}>
						<span>
							Height <span className={styles.infoSpan}> (inch)</span>
						</span>
						<span className={styles.infoSpan}>45</span>
					</li>
					<li className={styles.infoItem}>
						<span>
							Width <span className={styles.infoSpan}> (ft)</span>
						</span>
						<span className={styles.infoSpan}>45</span>
					</li>
					<li className={styles.infoItem}>
						<span>
							Weight <span className={styles.infoSpan}>(inch)</span>
						</span>
						<span className={styles.infoSpan}>45</span>
					</li>
				</ul>
			</div>
		</>
	);
};
export default DetailCard;
