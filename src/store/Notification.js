import { createSlice } from "@reduxjs/toolkit";

const initialState = { notificationList: [], counter: 1 };

const NotificationSlice = createSlice({
	name: "notification",
	initialState: initialState,

	reducers: {
		reset(state) {
			state.notificationList = [];
		},
		addError(state, pars) {
			state.counter++;
			state.notificationList.push({
				id: state.counter,
				type: "danger",
				message: pars.payload.message,
			});
		},
		addInfo(state, pars) {
			state.counter++;
			state.notificationList.push({
				id: state.counter,
				type: "secondary",
				message: pars.payload.message,
			});
		},
		removeNotification(state, pars) {
			state.notificationList = state.notificationList.filter(
				(item) => item.id !== pars.payload
			);
		},
	},
});

export const { addError, addInfo, removeNotification, reset } =
	NotificationSlice.actions;
export default NotificationSlice.reducer;
