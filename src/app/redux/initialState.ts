import { IOrderItem } from "@/interface/interface";

const initialState: IOrderItem = {
	orderStatus: 0,
	startLocation: {
		latitude: 0,
		longitude: 0,
	},
	stopLocations: [{ id: 0, latitude: 0, longitude: 0 }],
	finalDestination: {
		latitude: 0,
		longitude: 0,
	},

	inventoryItemIds: [],
	expectedDate: "",
	description: "",
	labourRequiredType: 0,
};

export default initialState;
