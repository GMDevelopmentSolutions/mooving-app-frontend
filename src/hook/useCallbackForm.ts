import { userService } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useCallbackForm = () => {
	return useMutation({
		mutationFn: (formValues: { [key: string]: string }) =>
			userService.callbackForm(formValues),
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
