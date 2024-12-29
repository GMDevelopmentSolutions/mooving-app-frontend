import { Field } from "formik";
import styles from "./TimeInput.module.scss";
import { type FC } from "react";
import Input from "@/app/components/input/input";
import Label from "@/app/components/Label/Label";
interface TimeInputProps {
	hover: string;
	minutes: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput: FC<TimeInputProps> = ({ hover, minutes, handleChange }) => {
	return (
		<div className={styles.timeContainer}>
			<span className={styles.text}>Time</span>
			<div className={styles.timeWrapper}>
				<Label htmlFor="hover">
					<Input
						type="number"
						min={0}
						max={24}
						name="hover"
						placeholder="Hover"
						title="hover"
						value={hover}
						onChange={handleChange}
					/>
				</Label>
				<span className={styles.colon}>:</span>
				<Label htmlFor="minutes">
					<Input
						type="number"
						min={0}
						max={59}
						name="minutes"
						placeholder="minutes"
						title="minutes"
						value={minutes}
						onChange={handleChange}
					/>
				</Label>
				<div className={styles.separator}>
					<Label htmlFor="format">
						<Field className={styles.checkbox} type="checkbox" name="format" />
						<span className={styles.checkmark}></span>
					</Label>
				</div>
			</div>
		</div>
	);
};

export default TimeInput;
