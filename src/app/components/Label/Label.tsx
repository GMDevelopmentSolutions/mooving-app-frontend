import type { FC } from "react";
import styles from "./Label.module.scss";
interface LabelProps {
	children: React.ReactNode;
	htmlFor: string;
}

const Label: FC<LabelProps> = ({ children, htmlFor }) => {
	return (
		<label htmlFor={htmlFor} className={styles.label}>
			{children}
		</label>
	);
};
export default Label;
