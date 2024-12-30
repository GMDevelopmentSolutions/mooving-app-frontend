import { useQuery } from "@tanstack/react-query";
import { inventorService } from "@/services/inventorService";

export const useGetInventoryItemsByOrderId = ({
	orderId,
}: {
	orderId: string;
}) => {
	return useQuery({
		queryKey: ["inventorGetInventorsByOrderId"],
		queryFn: () => inventorService.getInventoryItemByOrderId(orderId),
		enabled: !!orderId,
	});
};
