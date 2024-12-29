import OrderManagement from "@/app/components/OrderManagement/OrderManagement";
import type { FC } from "react";

interface OrderItemIdPageProps {
	params: {
		orderId: string;
	};
}

const OrderItemIdPage: FC<OrderItemIdPageProps> = ({ params: { orderId } }) => {
	return <OrderManagement orderId={orderId} />;
};
export default OrderItemIdPage;
