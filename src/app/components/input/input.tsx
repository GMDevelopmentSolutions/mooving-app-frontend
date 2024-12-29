import { useField } from "formik";
import { useState } from "react";
import styles from "./input.module.scss";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import clsx from "clsx";

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	name: string;
	hideToggle?: boolean;
	title?: string;
	showError?: boolean;
}

const Input: React.FC<InputProps> = ({
	hideToggle,
	type,
	title,
	showError = false,

	...props
}) => {
	const [field, meta] = useField(props);
	const [hide, setHide] = useState(true);

	const handleToggleHide = () => {
		setHide(!hide);
	};

	const inputType =
		type === "password" && hideToggle ? (hide ? "password" : "text") : type;

	return (
		<>
			{type === "password" && hideToggle && (
				<span className={styles.span}>
					{title}
					<button
						type="button"
						onClick={handleToggleHide}
						className={styles.buttonHide}
					>
						<SpriteSVG href="icon-visibility" />
						{hide ? "Show" : "Hide"}
					</button>
				</span>
			)}

			{type === "textarea" ? (
				<>
					<textarea
						{...field}
						{...props}
						className={styles.textarea}
						maxLength={30}
					/>
					<span className={styles.spanValue}>
						{field?.value ? field?.value?.length : 0}/30
					</span>
				</>
			) : type === "radio" ? (
				<div className={styles.radioLabel}>
					<input {...field} {...props} type="radio" className={styles.radioInput} />
					<span></span>
					{title}
				</div>
			) : (
				<input
					{...field}
					{...props}
					type={inputType}
					className={clsx(styles.input, { [styles.number]: type === "number" })}
				/>
			)}

			{!showError && meta.touched && !meta.error && (
				<span className={styles.successMessage}>Good!</span>
			)}
			{!showError && meta.touched && meta.error && (
				<div className={styles.error}>{meta.error}</div>
			)}
		</>
	);
};

export default Input;
