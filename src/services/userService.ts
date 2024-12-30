import { ChangeInfoParams } from "@/interface/interface";
import instance from "./axiosInstance";

export const userService = {
	changeInfo: async ({
		name,
		phone,
		currentPassword,
		newPassword,
		confirmNewPassword,
	}: ChangeInfoParams) => {
		try {
			const { data } = await instance.post("users/changeInfo", {
				name,
				phone,
				currentPassword,
				newPassword,
				confirmNewPassword,
			});
			return data;
		} catch (error) {
			throw error;
		}
	},
	callbackForm: async (formValues: { [key: string]: string }) => {
		try {
			const { data } = await instance.post("/users/callbackForm", formValues);
			return data;
		} catch (error) {
			throw error;
		}
	},
};
