import { authorizationService } from "@/services/authorizationService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			authorizationService.loginRequest({ email, password }),
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
