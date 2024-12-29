import { resetRoute } from "@/app/redux/slice/locationSlice";
import { IOrderItem } from "@/interface/interface";
import { orderService } from "@/services/orderService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";
import { useDispatch } from "react-redux";

export const useSubmitRouteMutation = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationKey: ["submitRoute"],
		mutationFn: async (routeData: IOrderItem) => {
			await orderService.getRequest(routeData);
		},
		onSuccess: () => {
			dispatch(resetRoute());
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
