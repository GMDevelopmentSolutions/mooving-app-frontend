export const removeFromLocalStorage = () => {
	if (typeof window !== "undefined" && window.localStorage) {
		try {
			window.localStorage.removeItem("routeState");
		} catch (error) {
			throw error;
		}
	}
};
