"use client";
import { useState, type FC } from "react";
import Container from "../Container/Container";
import Button from "../Button/Button";
import MessageBlock from "../MessageBlock/MessageBlock";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import InventorList from "../InventorList/InventorList";
import WrapColum from "../WrapColum/WrapColum";
import Modal from "../Modal/modal";
import FormaInventor from "./FormaInventor/FormaInventor";
import styles from "./InventorManagement.module.scss";
import FormRoomPhoto from "../FormRoomPhoto/FormRoomPhoto";
import CounterList from "./CounterList/CounterList";
import FormAddRoom from "../FormAddRoom/FormAddRoom";
import { useGetInventorData } from "@/hook/useGetInventorData";
import { inventorService } from "@/services/inventorService";
import { IInventorsItems, Room } from "@/interface/interface";
import Link from "next/link";

const InventorManagement: FC = ({}) => {
	const [showModal, setShowModal] = useState(false);
	const [showRoomModal, setShowRoomModal] = useState(false);
	const [showRoomModalCreate, setShowRoomModalCreate] = useState(false);
	const [idToInvemtorCreate, setIdToInvemtorCreate] = useState("");
	const { data, isError, error } = useGetInventorData("inventorGetRooms", () =>
		inventorService.getRooms(),
	);
	const rooms = data as Room[] | undefined;
	const { data: inventors } = useGetInventorData("inventorGetInventors", () =>
		inventorService.getItems(),
	);
	const inventorsItems = inventors as IInventorsItems[] | undefined;

	const handleShowModal = (): void => {
		setShowModal(!showModal);
		if (showModal) setIdToInvemtorCreate("");
	};

	const handleShowRoomModal = (): void => {
		setShowRoomModal(!showRoomModal);
	};

	const handleShowModalAddInventory = (): void => {
		setShowModal(!showModal);
	};

	const handleShowModalRoomCreate = (): void => {
		setShowRoomModalCreate(!showRoomModalCreate);
	};

	return (
		<>
			{showModal && (
				<Modal handleClose={handleShowModal} title="Add your inventory">
					<FormaInventor
						idToInvemtorCreate={idToInvemtorCreate}
						rooms={rooms}
						onClose={handleShowModal}
					/>
				</Modal>
			)}
			{showRoomModalCreate && (
				<Modal handleClose={handleShowModalRoomCreate} title="Add room">
					<FormAddRoom onClose={handleShowModalRoomCreate} />
				</Modal>
			)}
			{showRoomModal && (
				<Modal handleClose={handleShowRoomModal} title="Add your inventory">
					<FormRoomPhoto />
				</Modal>
			)}
			<Container>
				<WrapColum>
					<div className={styles.wrapButton}>
						<Button buttonClass="buttonGrey" onClick={handleShowModalAddInventory}>
							<SpriteSVG href="icon-dashboard" color="#F56F51" /> Self-load inventory
						</Button>
						{/* <Button
							onClick={handleShowRoomModal}
							buttonClass="buttonGrey"
							className={styles.buttonAdd}
						>
							{isMobile && (
								<SpriteSVG href="icon-add_photo_alternate" color="#ffffff" />
							)}
							{!isMobile && <SpriteSVG href="icon-add-photo" color="#F56F51" />}
							Add photo room
						</Button> */}
						<MessageBlock>
							The author shows a deep understanding of complex characters in the book,
							portraying each
						</MessageBlock>
					</div>

					<InventorList
						isError={isError}
						error={error}
						rooms={rooms}
						onclick={{
							setIdToInvemtorCreate,
							handleShowModal,
							handleShowModalRoomCreate,
						}}
					/>
					<div className={styles.wrapCounter}>
						<CounterList inventorsItems={inventorsItems} title="All inventory" />
						{rooms?.map(el => {
							return (
								<CounterList
									key={el.id}
									inventorsItems={inventorsItems}
									roomsId={el.id}
									title={`${el.name} inventory`}
								/>
							);
						})}
					</div>
					<Link href="/order">
						<Button buttonClass="buttonGreen" className={styles.buttonGreen}>
							Save and back to request
						</Button>
					</Link>
				</WrapColum>
			</Container>
		</>
	);
};
export default InventorManagement;
