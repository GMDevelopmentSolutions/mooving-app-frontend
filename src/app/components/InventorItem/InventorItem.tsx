import { type FC } from "react";
import styles from "./InventorItem.module.scss";
import Image from "next/image";
import { InventorItemProps } from "@/interface/interface";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import { inventorService } from "@/services/inventorService";
import { useInventorMutation } from "@/hook/useInventorMutate";
import { Confirm } from "notiflix";

const InventorItem: FC<InventorItemProps> = ({ id, src, text, onClick }) => {
	const { mutate } = useInventorMutation({
		mutationFn: (id: string | undefined) => inventorService.deleteRoom(id),
		onSuccessMessage: "The room has been deleted",
		onErrorMessage: "Failed to delete room.",
		invalidateQueriesKey: "inventorGetRooms",
	});

	const handleDelete = () => {
		Confirm.show(
			"Room delete action",
			`Are you sure you want to remove the ${text}?`,
			"Yes",
			"No",
			() => {
				mutate(id);
			},
			() => null,
			{
				backgroundColor: "white",
				titleColor: "black",
				messageColor: "black",
				titleFontSize: "24px",
				cancelButtonBackground: "red",
				okButtonColor: "black",
				cancelButtonColor: "black",
				borderRadius: "8px",
				okButtonBackground: "green",
			},
		);
	};

	const action =
		text !== "Add room"
			? () => {
					onClick?.handleShowModal?.();
					if (id) onClick?.setIdToInvemtorCreate?.(id);
				}
			: onClick?.handleShowModalRoomCreate;

	return (
		<li className={styles.item}>
			<div className={styles.roomCardContainer}>
				<div className={styles.attach}>
					{text !== "Add room" && (
						<button
							type="button"
							className={styles.deleteButton}
							onClick={handleDelete}
						>
							<SpriteSVG
								href="icon-delete"
								width={20}
								height={30}
								className={styles.iconDelete}
							/>
						</button>
					)}
				</div>

				<button className={styles.button} type="button" onClick={action}>
					<Image
						className={styles.img}
						src={src}
						alt="logo"
						width={70}
						height={70}
					/>
					<span className={styles.text}>{text}</span>
				</button>
			</div>
		</li>
	);
};
export default InventorItem;
