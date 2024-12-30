"use client";

import { useGetUsersMe } from "@/hook/useGetUsersMe";
import { useEffect, type FC } from "react";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
	children: React.ReactNode;
	userRole: number;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, userRole }) => {
	const router = useRouter();
	const { data, isLoading, isError } = useGetUsersMe();

	useEffect(() => {
		if (isLoading) return;

		if (Number(data?.role) === 100) {
			router.push("/admin");
			return;
		}

		if (Number(data?.role) === userRole) {
			return;
		}

		if (isError) {
			router.push("/login");
			return;
		}

		if (!isLoading && !data) {
			router.push("/login");
			return;
		}

		if (Number(data?.role) !== userRole) {
			router.push("/login");
			return;
		}
	}, [data, isError, isLoading, router, userRole]);

	if (isLoading) return <Loader />;

	return <>{children}</>;
};
export default PrivateRoute;
