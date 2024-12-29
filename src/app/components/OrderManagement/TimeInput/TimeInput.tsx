import styles from "./TimeInput.module.scss";
import { type FC } from "react";
import { TimeUnit } from "@/interface/interface";
interface TimeInputProps {
	hover: string;
	minutes: string;
	handleChange: (field: string, value: string | boolean) => void;
	disabled: boolean;
}

interface HandleTimeChange {
	(
		field: TimeUnit,
		value: string | boolean,
		min: number,
		max: number,
		unit: TimeUnit,
	): void;
}

const TimeInput: FC<TimeInputProps> = ({
	hover,
	minutes,
	handleChange,
	disabled,
}) => {
	const handleTimeChange: HandleTimeChange = (field, value, min, max, unit) => {
		if (typeof value === "boolean") return;
		if (field !== unit) return;
		const numericValue = parseInt(value);
		if (numericValue < min) return handleChange(field, min.toString());
		if (numericValue > max) return handleChange(field, max.toString());
		handleChange(field, value);
	};

	return (
		<div className={styles.timeContainer}>
			<span className={styles.text}>Time</span>
			<div className={styles.timeWrapper}>
				<label htmlFor={`${TimeUnit.HOURS}`}>
					<input
						type="number"
						className={styles.input}
						min={0}
						max={23}
						name={TimeUnit.HOURS}
						title="hours"
						value={hover}
						onChange={event =>
							handleTimeChange(
								TimeUnit.HOURS,
								event.target.value,
								0,
								23,
								TimeUnit.HOURS,
							)
						}
						onFocus={event => event.target.select()}
						disabled={disabled}
					/>
				</label>
				<span className={styles.colon}>:</span>
				<label htmlFor={`${TimeUnit.MINUTES}`}>
					<input
						type="number"
						className={styles.input}
						min={0}
						max={59}
						name={TimeUnit.MINUTES}
						title="minutes"
						value={minutes}
						onChange={event =>
							handleTimeChange(
								TimeUnit.MINUTES,
								event.target.value,
								0,
								59,
								TimeUnit.MINUTES,
							)
						}
						onFocus={event => event.target.select()}
						disabled={disabled}
					/>
				</label>
				{/* <div className={styles.separator}>
					<label htmlFor="format-time" className={styles.labelCheck}>
						<input
							className={styles.checkbox}
							type="checkbox"
							name="format-time"
							checked={formatTime}
							id="format-time"
							onChange={event =>
								handleChange(TimeUnit.FORMAT_TIME, event.target.checked)
							}
						/>
						<span className={styles.checkmark}></span>
					</label>
				</div> */}
			</div>
		</div>
	);
};

export default TimeInput;
