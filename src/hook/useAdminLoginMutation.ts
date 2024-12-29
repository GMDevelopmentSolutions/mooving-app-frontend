import { SetToken } from "@/interface/interface";
import { authorizationService } from "@/services/authorizationService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useAdminLoginMutation = (setToken: SetToken) => {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			authorizationService.loginRequest({ email, password }),
		onSuccess: () => {
			setToken("true");
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
