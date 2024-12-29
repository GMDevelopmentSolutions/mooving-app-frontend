import { OrderStatus } from "@/interface/interface";
import instance from "./axiosInstance";

export const adminOrder = {
	getAllOrdersRequest: async (page: number, filter: string) => {
		try {
			const { data } = await instance.get(`/admin/orders/`, {
				params: { page, pageSize: 10, filter },
			});

			return data;
		} catch (error) {
			throw error;
		}
	},

	attachInvoice: async ({ file, id }: { file: File; id: string }) => {
		try {
			const formData = new FormData();
			formData.append("invoiceFile", file);
			const { data } = await instance.put(
				`/admin/orders/${id}/attachInvoice`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);

			return data;
		} catch (error) {
			throw error;
		}
	},

	changeStatusOrder: async ({
		id,
		status,
	}: {
		id: string;
		status: OrderStatus;
	}) => {
		try {
			const { data } = await instance.get(`/admin/orders/${id}/changeStatus`, {
				params: { newStatus: status },
			});
			return data;
		} catch (error) {
			throw error;
		}
	},
};
