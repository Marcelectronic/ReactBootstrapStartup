import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Authentication";
import NotificationSlice from "./Notification";

const store = configureStore({
	reducer: { auth: AuthSlice, notification: NotificationSlice },
});

export default store;
