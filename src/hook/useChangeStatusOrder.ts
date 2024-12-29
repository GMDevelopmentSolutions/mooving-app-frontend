import { OrderStatus } from "@/interface/interface";
import { adminOrder } from "@/services/adminOrder";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useChangeStatusOrder = () => {
	return useMutation({
		mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
			adminOrder.changeStatusOrder({ id, status }),
		onSuccess: () => {
			Notify.success("You have successfully logged in.", {
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
