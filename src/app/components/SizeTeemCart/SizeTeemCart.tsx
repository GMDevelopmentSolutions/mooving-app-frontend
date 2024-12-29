import type { FC } from "react";
import styles from "./SizeTeemCart.module.scss";

interface SizeTeemCartProps {
	label: string;
	id: number;
	name: string;
	value: number;
	text: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled: boolean;
}

const SizeTeemCart: FC<SizeTeemCartProps> = ({
	label,
	id,
	name,
	value,
	text,
	checked = false,
	onChange,
	disabled,
}) => {
	return (
		<>
			{/* */}
			<div
				className={`${styles.sizeTeemCart} ${checked ? styles.checked : ""} ${disabled ? styles.disabled : ""}`}
			>
				<label>
					<div className={styles.radioWrapper}>
						<span className={styles.radioActive}></span>
						<input
							type="radio"
							id={id.toString()}
							name={name}
							value={value}
							checked={checked}
							onChange={onChange}
							disabled={disabled}
						/>
						{label}
					</div>

					<span className={styles.text}>{text}</span>
				</label>
			</div>
		</>
	);
};

export default SizeTeemCart;
