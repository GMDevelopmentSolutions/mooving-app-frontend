import styles from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	buttonClass:
		| "buttonWhite"
		| "buttonGreen"
		| "buttonGrey"
		| "loadMore"
		| "buttonBlue";
}

const Button = ({ children, buttonClass, className, ...props }: Props) => {
	return (
		<button
			className={`${styles.button} ${styles[buttonClass]} ${className} `}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
