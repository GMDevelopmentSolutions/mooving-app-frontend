import React, { useState, useEffect, useRef, FC } from "react";
import { OrderStatus } from "../../../../../interface/interface";
import styles from "./StatusDropdown.module.scss";
import clsx from "clsx";
import labelByStatus from "../../../../../utils/labelByStatus";

interface Props {
	status: OrderStatus;
	isUser?: boolean;
	onChangeStatus?: (id: string, status: OrderStatus) => void;
	id?: string;
}

const availableStatuses = [
	"Request",
	"Confirmed",
	"Booked",
	"Cancelled",
	"Closed",
	"Invoice Sent",
	"Invoice Confirmed",
] as const;

const statusToNumber = {
	Request: 0,
	Booked: 5,
	"Invoice Sent": 10,
	"Invoice Confirmed": 20,
	Confirmed: 50,
	Closed: 100,
	Cancelled: 400,
} as const;

const StatusDropdown: FC<Props> = ({ status, isUser, onChangeStatus, id }) => {
	console.log("status: " + status);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(labelByStatus[status]);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const changeStatus = (newStatus: string) => {
		setSelectedStatus(newStatus);
		const newStatusNumber =
			statusToNumber[newStatus as keyof typeof statusToNumber];
		setIsOpen(false);
		if (onChangeStatus && id) onChangeStatus(id, newStatusNumber);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const filteredStatuses = availableStatuses.filter(
		status => status !== selectedStatus,
	);
	const currentStatusClass = selectedStatus.toLowerCase();

	const formatStatusToClass = (status: string) => {
		return status.toLowerCase().replace(/\s+/g, "-");
	};

	return (
		<div className={styles.statusDropdown} ref={dropdownRef}>
			<button
				className={clsx(styles.status, styles[currentStatusClass])}
				onClick={toggleDropdown}
			>
				{selectedStatus}
			</button>

			{!isUser && isOpen && (
				<ul className={styles.dropdownMenu}>
					{filteredStatuses.map(status => (
						<li
							key={status}
							onClick={() => changeStatus(status)}
							className={clsx(styles.status, styles[formatStatusToClass(status)])}
						>
							{status}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default StatusDropdown;
