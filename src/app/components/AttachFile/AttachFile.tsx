import type { FC } from "react";
import styles from "./AttachFile.module.scss";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
interface AttachFileProps {
	isPhoto?: boolean;
}

const AttachFile: FC<AttachFileProps> = ({ isPhoto = false }) => {
	return (
		<>
			<label htmlFor="file" className={styles.attachFile}>
				{isPhoto ? (
					<>
						<SpriteSVG href="icon-attach" width={15} height={20} color="#5865da" />
					</>
				) : (
					<>
						<SpriteSVG
							href="icon-add_photo_alternate"
							width={18}
							height={18}
							color="#5865da"
						/>
					</>
				)}
				<input type="file" id="file" name="file" />
			</label>
		</>
	);
};
export default AttachFile;
