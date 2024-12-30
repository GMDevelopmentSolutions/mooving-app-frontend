import Header from "@/app/components/Header/Header";
import InventorManagement from "@/app/components/InventorManagement/InventorManagement";

export const metadata = {
	title: "Order",
	description: "Order",
};

const InventorPage = () => {
	return (
		<>
			<Header isBackButtonVisible={true}>Inventory Page</Header>
			<InventorManagement />
		</>
	);
};

export default InventorPage;
