import { IOrderItem } from "../../../interface/interface";

export const setToLocalStorage = (state: IOrderItem): void => {
	if (typeof window === "undefined" || !window.localStorage) return;
	window.localStorage.setItem("routeState", JSON.stringify(state));
};
