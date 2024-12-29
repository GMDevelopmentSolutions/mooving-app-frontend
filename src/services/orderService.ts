import { IOrderItem } from "@/interface/interface";
import instance from "./axiosInstance";

export const orderService = {
	getRequest: async (routeData: IOrderItem) => {
		try {
			const { data } = await instance.post(`/order/create`, routeData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data;
		} catch (error) {
			throw error;
		}
	},

	getAllRequest: async () => {
		try {
			const { data } = await instance.get(`/order/getall`);

			return data;
		} catch (error) {
			throw error;
		}
	},

	getOrderByIdRequest: async (orderId: string) => {
		try {
			const { data } = await instance.get(`/order/get/${orderId}`);

			return data;
		} catch (error) {
			throw error;
		}
	},

	cancelOrderByIdRequest: async ({ orderId }: { orderId: string }) => {
		try {
			const { data } = await instance.post(`/order/cancel/${orderId}`);

			return data;
		} catch (error) {
			throw error;
		}
	},
};
