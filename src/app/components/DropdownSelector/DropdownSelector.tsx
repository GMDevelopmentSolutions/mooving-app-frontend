"use client";

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import styles from "./DropdownSelector.module.scss";
import SpriteSVG from "../SpriteSVG/SpriteSVG";

interface DropdownOption {
	key: string | number;
	value: string;
}

interface DropdownSelectorProps {
	options: DropdownOption[];
	setValue?: (value: string) => void;
}

const DropdownSelector: FC<DropdownSelectorProps> = ({ options, setValue }) => {
	const [selectedFilter, setSelectedFilter] = useState<number | string>(
		options[0].value,
	);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

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

	const changeFilter = (key: string, value: string) => {
		setSelectedFilter(value);
		if (setValue) {
			setValue(key);
		}
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.filterSwitcher} ref={dropdownRef}>
			<button
				className={`${styles.dropdownToggle} ${isOpen ? styles.open : ""} `}
				onClick={toggleDropdown}
			>
				<SpriteSVG href="icon-filter_list" />

				<span>{selectedFilter}</span>
			</button>
			<ul className={`${styles.dropdownMenu} ${isOpen ? styles.open : ""} `}>
				{options.map(({ key, value }) => (
					<li key={key} onClick={() => changeFilter(key.toString(), value)}>
						<p>{value}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DropdownSelector;
