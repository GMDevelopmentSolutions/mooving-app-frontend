import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/orderService";

export const useGetAllOrder = () => {
	return useQuery({
		queryKey: ["getAllOrder"],
		queryFn: () => orderService.getAllRequest(),
	});
};
