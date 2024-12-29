import { orderService } from "@/services/orderService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useCancelOrderByIdMutation = () => {
	return useMutation({
		mutationKey: ["cancelOrderById"],
		mutationFn: async ({ orderId }: { orderId: string }) => {
			await orderService.cancelOrderByIdRequest({ orderId });
		},
		onSuccess: () => {
			Notify.success("You have successfully canceled the order.", {
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
