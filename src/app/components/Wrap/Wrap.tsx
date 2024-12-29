import type { FC } from "react";
import styles from "./Wrap.module.scss";
interface WrapProps {
	children: React.ReactNode;
}

const Wrap: FC<WrapProps> = ({ children }) => {
	return <div className={styles.wrap}>{children}</div>;
};
export default Wrap;
