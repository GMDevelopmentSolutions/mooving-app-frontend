import { authorizationService } from "@/services/authorizationService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useForgotPasswordMutation = () => {
	return useMutation({
		mutationFn: ({ email }: { email: string }) =>
			authorizationService.forgotPassword({ email }),
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
