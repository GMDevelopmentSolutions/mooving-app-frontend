import { useQuery } from "@tanstack/react-query";
import { adminOrder } from "@/services/adminOrder";

export const useGetAllOrders = ({
	page,
	filter,
}: {
	page: number;
	filter: string;
}) => {
	return useQuery({
		queryKey: ["getAllAdminOrders", page, filter],
		queryFn: () => adminOrder.getAllOrdersRequest(page, filter),
	});
};
