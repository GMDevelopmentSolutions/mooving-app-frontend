"use client";
import { useState, useEffect, type FC } from "react";
import styles from "./AdminTableBody.module.scss";
import labelByStatus from "@/utils/labelByStatus";
import clsx from "clsx";
import StatusDropdown from "@/app/components/StatusManagement/Table/StatusDropdown/StatusDropdown";
import Btn from "@/app/components/Btn/Btn";
import SpriteSVG from "@/app/components/SpriteSVG/SpriteSVG";
import Modal from "@/app/components/Modal/modal";
import FormAttachInvoice from "../../FormAttachInvoice/FormAttachInvoice";
import { IOrderItem, OrderStatus } from "../../../../../interface/interface";
import { getCityAndStreet } from "@/utils/getCityAndStreet";
import InfoList from "./InfoList/InfoList";
import { useChangeStatusOrder } from "@/hook/useChangeStatusOrder";

interface AdminTableBodyProps {
	orders: IOrderItem[];
}

const AdminTableBody: FC<AdminTableBodyProps> = ({ orders }) => {
	const [modalAttach, setModalAttach] = useState(false);
	const [currentId, setCurrentId] = useState<string>();
	const [modalInfo, setModalInfo] = useState(false);
	const [orderInfo, setOrderInfo] = useState<IOrderItem>();
	const [locations, setLocations] = useState<{
		[id: string]: { start: string; destination: string };
	}>({});

	const { mutate: changeStatus } = useChangeStatusOrder();

	const onChangeStatus = (id: string, status: OrderStatus) => {
		changeStatus({ id, status });
	};

	const handleAttach = () => {
		setModalAttach(!modalAttach);
	};

	useEffect(() => {
		const fetchLocations = async () => {
			const locationsMap: {
				[id: string]: { start: string; destination: string };
			} = {};
			for (const order of orders) {
				const start = await getCityAndStreet({
					lat: order.startLocation.latitude,
					lon: order.startLocation.longitude,
				});
				const destination = await getCityAndStreet({
					lat: order.finalDestination.latitude,
					lon: order.finalDestination.longitude,
				});
				locationsMap[order.id ?? ""] = { start, destination };
			}
			setLocations(locationsMap);
		};

		fetchLocations();
	}, [orders]);

	const defaultOrderStatus: OrderStatus = OrderStatus.Booked;

	const handleInfo = () => {
		setModalInfo(!modalInfo);
	};

	return (
		<>
			{modalAttach && (
				<Modal handleClose={handleAttach} title="Attach Invoice">
					<FormAttachInvoice onClose={handleAttach} id={currentId || ""} />
				</Modal>
			)}

			{modalInfo && (
				<Modal title="Order info" handleClose={handleInfo}>
					{orderInfo && (
						<InfoList locations={locations} orderId={orderInfo.id || ""} />
					)}
				</Modal>
			)}

			<tbody className={styles.tbody}>
				{orders.map((order: IOrderItem) => {
					const statusClass = order.orderStatus
						? labelByStatus[order.orderStatus].toLowerCase()
						: "";

					const location = locations[order.id ?? ""] || {
						start: "Loading...",
						destination: "Loading...",
					};

					return (
						<tr key={order.id} className={styles.tr}>
							{/* <td className={styles.name}>{clientName}</td>*/}
							<td
								className={styles.id}
								onClick={() => {
									handleInfo();
									setOrderInfo(order);
								}}
							>
								{order.id}
							</td>
							{/* <td className={styles.phone}>{phoneNumber}</td> */}
							<td className={styles.requestType}>{order.labourRequiredType}</td>
							<td className={styles.startPoint}>{location.start}</td>
							<td className={styles.destination}>{location.destination}</td>
							<td className={styles.description}>
								{order.description ? order.description : "- - -"}
							</td>
							<td className={styles.date}>
								{new Date(order.expectedDate).toLocaleDateString("en-US", {
									year: "numeric",
									month: "numeric",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
								})}
							</td>
							<td className={clsx(styles.status, styles[statusClass], styles.status)}>
								<StatusDropdown
									onChangeStatus={onChangeStatus}
									id={order.id}
									status={order.orderStatus ?? defaultOrderStatus}
								/>
							</td>
							<td className={styles.button}>
								<Btn
									onClick={() => {
										handleAttach();
										setCurrentId(order.id);
									}}
								>
									<SpriteSVG href="icon-ion_document" className={styles.icon} />
								</Btn>
							</td>
						</tr>
					);
				})}
			</tbody>
		</>
	);
};

export default AdminTableBody;
