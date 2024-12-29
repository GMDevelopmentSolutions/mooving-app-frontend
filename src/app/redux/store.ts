import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slice/locationSlice";

export const store = configureStore({
	reducer: {
		route: locationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
