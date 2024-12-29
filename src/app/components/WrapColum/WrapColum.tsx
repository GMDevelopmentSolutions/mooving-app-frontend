import type { FC } from "react";
import styles from "./WrapColum.module.scss";
interface WrapColumProps {
	children: React.ReactNode;
}

const WrapColum: FC<WrapColumProps> = ({ children }) => {
	return <div className={styles.wrapColum}>{children}</div>;
};
export default WrapColum;
