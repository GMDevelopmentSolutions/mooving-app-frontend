import { authorizationService } from "@/services/authorizationService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useLogoutMutation = () => {
	return useMutation({
		mutationFn: () => authorizationService.logoutRequest(),
		onSuccess: () => {
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
