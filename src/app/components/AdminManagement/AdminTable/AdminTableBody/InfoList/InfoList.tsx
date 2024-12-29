import { IOrderItem } from "@/interface/interface";
import type { FC } from "react";
import styles from "./InfoList.module.scss";
import StatusDropdown from "@/app/components/StatusManagement/Table/StatusDropdown/StatusDropdown";

interface InfoListProps {
	orderInfo: IOrderItem;
	locations: {
		[id: string]: { start: string; destination: string };
	};
}

const InfoList: FC<InfoListProps> = ({
	locations,
	orderInfo: { id, labourRequiredType, expectedDate, description, orderStatus },
}) => {
	return (
		<ul className={styles.list}>
			<li>Order Id : {id}</li>
			<li>Type of request : {labourRequiredType}</li>
			<li>Start point : {id && locations[id]?.start}</li>
			<li>Destination : {id && locations[id]?.destination}</li>
			<li>Description : {description ? description : "No description"} </li>
			<li>
				Date and time of creating :
				{new Date(expectedDate).toLocaleDateString("en-US", {
					year: "numeric",
					month: "numeric",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
				})}
			</li>
			<li>
				<StatusDropdown isUser status={orderStatus ?? 0} />
			</li>
		</ul>
	);
};
export default InfoList;
