"use client";
import { useState, type FC } from "react";
import Wrap from "../Wrap/Wrap";
import Table from "./Table/Table";
import WaiverForm from "./WaiverForm/WaiverForm";
import Modal from "../Modal/modal";
import styles from "./StatusManagement.module.scss";
import { useGetAllOrder } from "@/hook/useGetAllOrder";
import { Notify } from "notiflix";
import { useCancelOrderByIdMutation } from "@/hook/useCancelOrderByIdMutation";

const StatusManagement: FC = ({}) => {
	const [modalWaiver, setModalWaiver] = useState(false);
	const [orderId, setOrderId] = useState<string>();
	const { mutate: cancelOrderById, isPending } = useCancelOrderByIdMutation();
	const { data: orders, isError, error } = useGetAllOrder();

	if (isError)
		Notify.failure(`${error}`, {
			position: "right-top",
			clickToClose: true,
			timeout: 5000,
			cssAnimationStyle: "zoom",
		});

	const handleModalWaiver = () => {
		setModalWaiver(!modalWaiver);
	};

	return (
		<>
			{modalWaiver && (
				<Modal
					handleClose={handleModalWaiver}
					title="Select the reason for refusal"
				>
					<WaiverForm
						orderId={orderId || ""}
						cancelOrderById={cancelOrderById}
						isPending={isPending}
						onClose={handleModalWaiver}
					/>
				</Modal>
			)}
			<div className={styles.container}>
				<Wrap>
					<Table
						data={orders}
						onClickModalWaiver={() => {
							handleModalWaiver();
						}}
						setOrderId={setOrderId}
					/>
				</Wrap>
			</div>
		</>
	);
};
export default StatusManagement;
