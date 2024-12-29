import type { FC } from "react";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import styles from "./BtnDelete.module.scss";
interface BtnDeleteProps extends React.HTMLAttributes<HTMLButtonElement> {
	absolute?: boolean;
	onClick?: () => void;
}

const BtnDelete: FC<BtnDeleteProps> = ({ absolute, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={styles.btnDelete}
			style={{ position: absolute ? "absolute" : "static" }}
		>
			<SpriteSVG href="icon-delete" width={18} height={21} />
		</button>
	);
};
export default BtnDelete;
