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
				{data?.map(({ id, briefDescription, orderStatus, expectedDate }) => {
					const statusClass = labelByStatus[orderStatus].toLowerCase();
					return (
						<tr key={id} className={styles.tr}>
							<td
								onClick={() => handleRedirect(id)}
								className={styles.label}
								title={id.toString()}
							>
								Label {id}
							</td>
							<td
								className={styles.description}
								title={briefDescription}
								onClick={() => handleRedirect(id)}
							>
								{briefDescription ? briefDescription : "- - - -"}
							</td>
							<td
								className={clsx(styles.status, styles[statusClass], styles.status)}
								onClick={() => handleRedirect(id)}
							>
								<StatusDropdown isUser status={orderStatus} />
							</td>
							<td className={styles.date} onClick={() => handleRedirect(id)}>
								{formatDate(expectedDate)}
							</td>
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
