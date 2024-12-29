import type { FC } from "react";
import styles from "./TableHade.module.scss";

const TableHade: FC = ({}) => {
	return (
		<>
			<thead className={styles.thead}>
				<tr className={styles.tr}>
					<th className={styles.label}>Name of request/order</th>
					<th className={styles.description}>Brief description</th>
					<th className={styles.status}>Current status</th>
					<th className={styles.date}>Date of Book</th>
					<th className={styles.button}></th>
				</tr>
			</thead>
		</>
	);
};

export default TableHade;
