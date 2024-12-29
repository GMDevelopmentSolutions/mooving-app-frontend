"use client";

import type { FC } from "react";
import SearchField from "../../SearchField/SearchField";
import styles from "./Toolbar.module.scss";
import DropdownSelector from "../../DropdownSelector/DropdownSelector";

interface HeaderProps {
	setFilter: (value: string) => void;
	setPage: (value: number) => void;
}

const header = [
	{ key: "clientName", value: "Client Name" },
	{ key: "orderId", value: "Order Id" },
	{ key: "phoneNumber", value: "Phone number" },
	{ key: "requestType", value: "Type of request" },
	{ key: "startPoint", value: "Start point" },
	{ key: "destination", value: "Destination" },
	{ key: "createdAt", value: "Date and time of creating " },
	{ key: "currentStatus", value: "Current status" },
];

const Toolbar: FC<HeaderProps> = ({ setFilter, setPage }) => {
	const handleSearch = (query: string) => {
		setFilter(query);
		setPage(1);
	};

	const handleDropdownSort = (query: string) => {
		setFilter(query);
		setPage(1);
	};

	return (
		<div className={styles.toolbar}>
			<SearchField search={handleSearch} />
			<DropdownSelector setValue={handleDropdownSort} options={header} />
		</div>
	);
};
export default Toolbar;
