"use client";

import { ChangeEvent, FC, useState } from "react";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import styles from "./SearchField.module.scss";
import useDebaunce from "../../../hook/useDebaunce";

interface SearchFieldProps {
	search: (queryString: string) => void;
	placeholder?: string;
	width?: string;
}

export const SearchField: FC<SearchFieldProps> = ({ search, placeholder }) => {
	const [queryString, setQueryString] = useState("");

	const searchDebaunced = useDebaunce(search, 1000);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQueryString(e.currentTarget.value);
		searchDebaunced(e.currentTarget.value);
	};

	return (
		<div className={styles.searchWrapper}>
			<SpriteSVG
				href="icon-search"
				className={styles.svg}
				width={24}
				height={24}
			/>
			<input
				placeholder={placeholder || "Find..."}
				className={styles.inputSearch}
				value={queryString}
				onChange={handleChange}
			></input>
		</div>
	);
};
export default SearchField;
