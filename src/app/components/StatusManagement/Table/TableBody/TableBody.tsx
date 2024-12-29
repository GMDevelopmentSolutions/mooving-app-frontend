"use client";
import { IOrderUser } from "@/interface/interface";
import clsx from "clsx";
import type { FC } from "react";
import styles from "./TableBody.module.scss";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import { usePathname, useRouter } from "next/navigation";
import labelByStatus from "@/utils/labelByStatus";
import { formatDate } from "@/utils/formatDate";

interface TableBodyProps {
	data: IOrderUser[];
	onClickModalWaiver: () => void;
	setOrderId: (value: string) => void;
}
const TableBody: FC<TableBodyProps> = ({
	data,
	onClickModalWaiver,
	setOrderId,
}) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleRedirect = (id: number) => {
		router.push(`${pathname}/${id}`);
	};
	return (
		<>
			<tbody className={styles.tbody}>
				{data?.map(({ id, briefDescription, orderStatus, expectedDate }, index) => {
					const statusClass = labelByStatus[orderStatus].toLowerCase();
					return (
						<tr key={id} className={styles.tr}>
							<td onClick={() => handleRedirect(id)} className={styles.label}>
								Label {index + 1}
							</td>
							<td className={styles.description}>{briefDescription}</td>
							<td className={clsx(styles.status, styles[statusClass], styles.status)}>
								<StatusDropdown isUser status={orderStatus} />
							</td>
							<td className={styles.date}>{formatDate(expectedDate)}</td>
							<td className={clsx(styles.refusal, styles.button)}>
								{Number(orderStatus) !== 0 && (
									<button
										onClick={() => {
											onClickModalWaiver();
											setOrderId(id.toString());
										}}
									>
										No more need it
									</button>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</>
	);
};
export default TableBody;
