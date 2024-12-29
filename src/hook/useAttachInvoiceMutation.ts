import { adminOrder } from "@/services/adminOrder";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useAttachInvoiceMutation = () => {
	return useMutation({
		mutationFn: ({ file, id }: { file: File; id: string }) =>
			adminOrder.attachInvoice({ file, id }),

		onSuccess: () => {
			Notify.success("You have successfully logged in.", {
				position: "right-top",
				clickToClose: true,
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
		},
		onError: (error: AxiosError) => {
			Notify.failure(`${error.response?.data}`, {
				position: "right-top",
				clickToClose: true,
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
		},
	});
};
