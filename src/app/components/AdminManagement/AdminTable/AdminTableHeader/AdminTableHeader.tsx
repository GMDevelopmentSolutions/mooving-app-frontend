import type { FC } from "react";
import styles from "./AdminTableHeader.module.scss";

const AdminTableHeader: FC = ({}) => {
	return (
		<>
			<thead className={styles.thead}>
				<tr className={styles.tr}>
					{/* <th className={styles.name}>Client Name</th> */}
					<th className={styles.id}>Order Id</th>
					{/* <th className={styles.phone}>Phone number</th> */}
					<th className={styles.requestType}>Type of request</th>
					<th className={styles.startPoint}>Start point</th>
					<th className={styles.destination}>Destination</th>
					<th className={styles.description}>Description</th>
					<th className={styles.date}>Date and time of creating </th>
					<th className={styles.status}>Current status</th>
					<th className={styles.button}>Attach an invoice for payment</th>
					{/* <th className={styles.button}>Create PDF invoice </th> */}
				</tr>
			</thead>
		</>
	);
};
export default AdminTableHeader;
