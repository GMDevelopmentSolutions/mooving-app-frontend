import { IOrderItem } from "@/interface/interface";
import { queryClient } from "@/lib/queryClient";
import { orderService } from "@/services/orderService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useSubmitRouteMutation = () => {
	return useMutation({
		mutationKey: ["submitRoute"],
		mutationFn: async (routeData: IOrderItem) => {
			await orderService.getRequest(routeData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inventorGetInventors"] });
			Notify.success("The action was successful.", {
				position: "right-top",
				clickToClose: true,
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
		},
		onError: (error: AxiosError) => {
			Notify.failure(`${error.message}`, {
				position: "right-top",
				clickToClose: true,
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
		},
	});
};
