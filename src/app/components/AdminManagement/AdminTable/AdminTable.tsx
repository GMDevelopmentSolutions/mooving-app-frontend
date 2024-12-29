import type { FC } from "react";
import styles from "./AdminTable.module.scss";
import AdminTableHeader from "./AdminTableHeader/AdminTableHeader";
import AdminTableBody from "./AdminTableBody/AdminTableBody";
import { IOrderItem } from "@/interface/interface";

interface AdminTableProps {
	orders: IOrderItem[];
}

const AdminTable: FC<AdminTableProps> = ({ orders }) => {
	return (
		<div className={styles.tableContainer}>
			<table className={styles.table}>
				<AdminTableHeader />
				<AdminTableBody orders={orders} />
			</table>
		</div>
	);
};
export default AdminTable;
