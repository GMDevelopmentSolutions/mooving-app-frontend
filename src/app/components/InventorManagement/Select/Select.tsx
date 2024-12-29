import { FC, useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import clsx from "clsx";

export interface Option {
	id: string;
	name: string;
	photoPath: string;
}

interface CustomSelectProps {
	options: Option[] | undefined;
	onSelect: (value: string) => void;
}

const Select: FC<CustomSelectProps> = ({ options, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<Option | null>(null);
	const selectRef = useRef<HTMLDivElement>(null);
	const toggleDropdown = () => {
		setIsOpen(prev => !prev);
	};

	const handleOptionClick = (option: Option) => {
		setSelectedOption(option);
		onSelect(option.name);
		setIsOpen(false);
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.customSelect} ref={selectRef}>
			<div className={styles.selectedOption} onClick={toggleDropdown}>
				{selectedOption ? (
					<span className={styles.selectedValue}>{selectedOption.name}</span>
				) : options?.length === 0 ? (
					"No rooms available, create a new one"
				) : (
					"Select an option"
				)}
			</div>
			{isOpen && (
				<ul className={styles.optionsList}>
					{options &&
						options.map(option => (
							<li
								key={option.id}
								onClick={() => {
									handleOptionClick(option);
								}}
								className={clsx(styles.optionItem, {
									[styles.selected]: option.name === selectedOption?.name,
								})}
							>
								{option.name}
							</li>
						))}
				</ul>
			)}
		</div>
	);
};

export default Select;
