import { type FC } from "react";
import styles from "./InventorList.module.scss";
import InventorItem from "../InventorItem/InventorItem";
import { Notify } from "notiflix";
import { InventorListProps } from "@/interface/interface";

const InventorList: FC<InventorListProps> = ({
	isError,
	error,
	rooms,
	onclick: { handleShowModal, handleShowModalRoomCreate },
}) => {
	if (isError)
		Notify.failure(`${error}`, {
			position: "right-top",
			clickToClose: true,
			timeout: 5000,
			cssAnimationStyle: "zoom",
		});

	return (
		<ul className={styles.list}>
			<InventorItem
				text="Add room"
				onClick={handleShowModalRoomCreate}
				src="/img/inventorItem/add_room.png"
			/>
			{rooms?.map(item => (
				<InventorItem
					key={item.id}
					src={process.env.NEXT_PUBLIC_API_URL + "/uploads/" + item.photoPath}
					text={item.name}
					onClick={handleShowModal}
				/>
			))}
		</ul>
	);
};
export default InventorList;
