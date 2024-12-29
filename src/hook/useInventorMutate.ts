import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Notify } from "notiflix";

type MutationOptions<T> = {
	mutationFn: (params: T) => Promise<unknown>;
	onSuccessMessage: string;
	onErrorMessage: string;
	invalidateQueriesKey: string;
};
interface ErrorResponse {
	message: string;
}

export function useInventorMutation<T>({
	mutationFn,
	onSuccessMessage,
	onErrorMessage,
	invalidateQueriesKey,
}: MutationOptions<T>) {
	const data = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn,
		onSuccess: () => {
			Notify.success(onSuccessMessage, {
				position: "right-top",
				clickToClose: true,
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});

			data.invalidateQueries({ queryKey: [invalidateQueriesKey] });
			Notiflix.Loading.remove();
		},
		onMutate: () => {
			Notiflix.Loading.arrows({ svgColor: "#628ecb" });
		},
		onError: (error: ErrorResponse) => {
			Notify.failure(error.message || onErrorMessage, {
				position: "right-top",
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
			Notiflix.Loading.remove();
		},
	});

	return { mutate, isPending };
}
