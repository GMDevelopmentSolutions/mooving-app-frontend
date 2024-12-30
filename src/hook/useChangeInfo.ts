import { ChangeInfoParams } from "@/interface/interface";
import { userService } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

export const useChangeInfo = () => {
	return useMutation({
		mutationFn: (changeInfoValues: ChangeInfoParams) =>
			userService.changeInfo(changeInfoValues),
		onSuccess: () => {
			Notify.success(" You have successfully changed your information.", {
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
