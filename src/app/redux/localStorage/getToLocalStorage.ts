import initialState from "@/app/redux/initialState";
import { IOrderItem } from "@/interface/interface";

export const getToLocalStorage = (): IOrderItem => {
	if (typeof window === "undefined" || !window.localStorage) return initialState;
	try {
		const routeData = window.localStorage.getItem("routeState");

		return routeData ? JSON.parse(routeData) : initialState;
	} catch {
		return initialState;
	}
};
