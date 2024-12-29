import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/orderService";

export const useGetOrderById = ({ orderId }: { orderId: string }) => {
	return useQuery({
		queryKey: ["order", orderId],
		queryFn: () => orderService.getOrderByIdRequest(orderId),
		enabled: !!orderId,
	});
};
