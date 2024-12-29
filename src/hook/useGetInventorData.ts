import { useQuery } from "@tanstack/react-query";

export const useGetInventorData = <TData>(
	key: string,
	func: () => Promise<TData>,
) => {
	return useQuery({
		queryKey: [key],
		queryFn: func,
	});
};
