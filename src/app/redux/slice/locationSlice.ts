import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToLocalStorage } from "../localStorage/getToLocalStorage";
import { setToLocalStorage } from "../localStorage/setToLocalStorage";

import { Coordinates } from "@/interface/interface";

interface StopLocation {
	id: number;
	latitude: number;
	longitude: number;
}

const locationSlice = createSlice({
	name: "route",
	initialState: getToLocalStorage(),
	reducers: {
		setStartLocation(state, action: PayloadAction<Coordinates>) {
			state.startLocation = action.payload;
			setToLocalStorage(state);
		},
		setEndLocation(state, action: PayloadAction<Coordinates>) {
			state.finalDestination = action.payload;
			setToLocalStorage(state);
		},
		setStop(
			state,
			action: PayloadAction<{
				coordinates: Coordinates;
			}>,
		) {
			const { coordinates } = action.payload;
			const newStop = {
				id: Number(Date.now()),
				...coordinates,
			};
			state.stopLocations.push(newStop);
			setToLocalStorage(state);
		},
		updateStop(
			state,
			action: PayloadAction<{
				id: number;
				coordinates: Coordinates;
			}>,
		) {
			const { id, coordinates } = action.payload;
			const updatedStopLocations = state.stopLocations.find(
				(stopLocations: StopLocation) => stopLocations.id === id,
			);
			if (updatedStopLocations) {
				Object.assign(updatedStopLocations, coordinates);
			}
			setToLocalStorage(state);
		},
		removeStop(state, action: PayloadAction<number>) {
			state.stopLocations = state.stopLocations.filter(
				(stopLocations: StopLocation) => stopLocations.id !== action.payload,
			);
			setToLocalStorage(state);
		},
		setTimeAndDate(state, action: PayloadAction<string>) {
			state.expectedDate = action.payload;
			setToLocalStorage(state);
		},
		setDescription(state, action: PayloadAction<string>) {
			state.description = action.payload;
			setToLocalStorage(state);
		},
		setSizeTeem(state, action: PayloadAction<number>) {
			state.labourRequiredType = action.payload;
			setToLocalStorage(state);
		},
		setInventors(state, action: PayloadAction<string[]>) {
			state.inventoryItemIds = action.payload;
			setToLocalStorage(state);
		},

		resetRoute(state) {
			state = {
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
			setToLocalStorage(state);
		},
	},
});

export const {
	setStartLocation,
	setEndLocation,
	setStop,
	updateStop,
	removeStop,
	setTimeAndDate,
	setDescription,
	setSizeTeem,
	resetRoute,
	setInventors,
} = locationSlice.actions;

export default locationSlice.reducer;
