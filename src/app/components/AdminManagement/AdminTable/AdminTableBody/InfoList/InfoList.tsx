import type { FC } from "react";
import styles from "./InfoList.module.scss";
import StatusDropdown from "@/app/components/StatusManagement/Table/StatusDropdown/StatusDropdown";
import { useGetFullInformationByOrderId } from "@/hook/useGetFullInformationByOrderId";

interface InfoListProps {
	locations: {
		[id: string]: { start: string; destination: string };
	};
	orderId: string;
}

const InfoList: FC<InfoListProps> = ({ locations, orderId }) => {
	const { data } = useGetFullInformationByOrderId({
		orderId: orderId,
	});

	return (
		<ul className={styles.list}>
			<li>Order Id : {orderId}</li>
			<li>User Id : {data?.userData.id}</li>
			<li>Name : {data?.userData.userName}</li>
			<li>Email : {data?.userData.email}</li>
			<li>Phone number : {data?.userData.phoneNumber}</li>
			<li>Type of request : {data?.orderData.labourRequiredType}</li>
			<li>Start point : {orderId && locations[orderId]?.start}</li>
			<li>Destination : {orderId && locations[orderId]?.destination}</li>
			<li>
				Description :{" "}
				{data?.orderData.description
					? data?.orderData.description
					: "No description"}{" "}
			</li>
			<li>
				Date and time of creating :
				{new Date(data?.orderData.expectedDate).toLocaleDateString("en-US", {
					year: "numeric",
					month: "numeric",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
				})}
			</li>
			<StatusDropdown isUser status={data?.orderData.orderStatus ?? 0} />
		</ul>
	);
};
export default InfoList;
