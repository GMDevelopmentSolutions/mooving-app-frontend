import type { FC } from "react";
import styles from "./Table.module.scss";
import Container from "../../Container/Container";
import TableHade from "./TableHade/TableHade";
import TableBody from "./TableBody/TableBody";
import { IOrderUser } from "@/interface/interface";

interface TableProps {
	data: IOrderUser[];
	onClickModalWaiver: () => void;
	setOrderId: (value: string) => void;
}

const Table: FC<TableProps> = ({ data, onClickModalWaiver, setOrderId }) => {
	return (
		<Container className={styles.container}>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<TableHade />
					<TableBody
						data={data}
						setOrderId={setOrderId}
						onClickModalWaiver={onClickModalWaiver}
					/>
				</table>
			</div>
		</Container>
	);
};

export default Table;
