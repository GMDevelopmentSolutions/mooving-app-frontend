import { Field } from "formik";
import type { FC } from "react";
import styles from "./Checkbox.module.scss";
interface CheckboxProps {
	name: string;
	id: string;
	label: string;
}

const Checkbox: FC<CheckboxProps> = ({ name, id, label }) => {
	return (
		<>
			<Field
				type="checkbox"
				name={name}
				id={id}
				className={styles.checkbox}
				value={id}
			/>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
		</>
	);
};
export default Checkbox;
