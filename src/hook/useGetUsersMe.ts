import { useQuery } from "@tanstack/react-query";
import { authorizationService } from "@/services/authorizationService";

export const useGetUsersMe = () => {
	return useQuery({
		queryKey: ["usersMe"],
		queryFn: () => authorizationService.usersMeRequest(),
	});
};
