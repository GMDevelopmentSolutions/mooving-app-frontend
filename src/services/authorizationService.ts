import instance from "./axiosInstance";

export const authorizationService = {
	loginRequest: async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const data = await instance.post(`/login`, { email, password });

			return data.data;
		} catch (error) {
			throw error;
		}
	},
	sinInRequest: async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const { data } = await instance.post("/register", { email, password });

			return data;
		} catch (error) {
			throw error;
		}
	},

	usersMeRequest: async () => {
		try {
			const { data } = await instance.get("/users/me");
			return data;
		} catch (error) {
			throw error;
		}
	},

	logoutRequest: async () => {
		try {
			const { data } = await instance.get("/logout");
			return data;
		} catch (error) {
			throw error;
		}
	},
};
