import instance from "./axiosInstance";

export const inventorService = {
	getFromRoom: async (roomId: number) => {
		try {
			const response = await instance.post(`/room/get/${roomId}`);
			return response;
		} catch (error) {
			throw error;
		}
	},

	getRooms: async () => {
		try {
			const { data } = await instance.post("/room/getall");
			return data;
		} catch (error) {
			throw error;
		}
	},
	getItems: async () => {
		try {
			const { data } = await instance.get("/inventory-item/getAllUnasigned");
			return data;
		} catch (error) {
			throw error;
		}
	},
	getItem: async (itemId: number) => {
		try {
			const response = await instance.get(`/inventory-item/get/${itemId}`);
			return response;
		} catch (error) {
			throw error;
		}
	},
	deleteRoom: async (roomId: number) => {
		try {
			const response = await instance.delete(`/room/delete/${roomId}`);
			return response;
		} catch (error) {
			throw error;
		}
	},
	deleteItem: async (itemId: string) => {
		try {
			const response = await instance.delete(`/inventory-item/delete/${itemId}`);
			return response;
		} catch (error) {
			throw error;
		}
	},
	createRoom: async ({ name, picture }: { name: string; picture: File }) => {
		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("picture", picture);

			const response = await instance.post("/room/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return response;
		} catch (error) {
			throw error;
		}
	},
	createItem: async (formData: FormData) => {
		try {
			const response = await instance.post("/inventory-item/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			throw error;
		}
	},
	changeItemRoom: async (inventoryItemId: string, roomId: string) => {
		try {
			const response = await instance.put(
				"/inventory-item/attach-to-room",
				{
					inventoryItemId,
					roomId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			return response;
		} catch (error) {
			throw error;
		}
	},
	changeItem: async (changeFormData: FormData, itemId: string) => {
		console.log(itemId);
		try {
			const response = await instance.put(
				`/inventory/update/${itemId}`,
				changeFormData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			return response;
		} catch (error) {
			throw error;
		}
	},
	getInventoryItemByOrderId: async (orderId: string) => {
		try {
			const { data } = await instance.get(`/inventory-item/getByOrder/${orderId}`);
			return data;
		} catch (error) {
			throw error;
		}
	},
};
