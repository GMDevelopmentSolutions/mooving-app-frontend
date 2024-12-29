import Header from "@/app/components/Header/Header";
import StatusManagement from "@/app/components/StatusManagement/StatusManagement";
import type { FC } from "react";

const StatusPage: FC = ({}) => {
	return (
		<>
			<Header>Statuses of requests and orders</Header>
			<StatusManagement />
		</>
	);
};
export default StatusPage;
