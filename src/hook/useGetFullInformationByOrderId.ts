import { useQuery } from "@tanstack/react-query";
import { adminOrder } from "@/services/adminOrder";

export const useGetFullInformationByOrderId = ({
	orderId,
}: {
	orderId: string;
}) => {
	return useQuery({
		queryKey: ["getFullInformationByOrderId", orderId],
		queryFn: () => adminOrder.getFullInformationByOrderId(orderId),
	});
};
