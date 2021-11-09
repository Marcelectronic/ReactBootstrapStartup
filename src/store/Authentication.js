import { createSlice } from "@reduxjs/toolkit";
import { addError, addInfo } from "./Notification.js";

const initialState = { loggedIn: false, token: null, expiration: null };

const cleanKeys = () => {
	sessionStorage.removeItem("key");
	sessionStorage.removeItem("expiration");
};

const setKeys = (key, expire) => {
	sessionStorage.setItem("key", key);
	sessionStorage.setItem("expiration", expire);
};

const getKeys = () => {
	return {
		token: sessionStorage.getItem("key"),
		expirationTime: sessionStorage.getItem("expiration"),
	};
};

const checkInitialState = () => {
	const { token, expirationTime } = getKeys();

	if (token && expirationTime) {
		const diff = expirationTime - new Date().getTime();
		return diff > 0
			? { loggedIn: true, token: token, expiration: expirationTime }
			: initialState;
	} else return initialState;
};

const AuthSlice = createSlice({
	name: "authentication",
	initialState: checkInitialState(),
	reducers: {
		setLogout(state) {
			state.token = null;
			state.loggedIn = false;
			state.expiration = null;
			cleanKeys();
		},
		setLogin(state, pars) {
			const expirationTime =
				new Date().getTime() + parseInt(pars.payload.expiresIn) * 1000;
			state.token = pars.payload.idToken;
			state.loggedIn = true;
			state.expiration = expirationTime;
			setKeys(pars.payload.idToken, expirationTime);
		},
	},
});
export const logout = () => {
	return async (dispatch) => {
		dispatch(setLogout());
		dispatch(addInfo({ message: "User Logged out." }));
	};
};

export const login = (pars) => {
	return async (dispatch) => {
		try {
			const url =
				process.env.REACT_APP_API_AUTH_URL +
				process.env.REACT_APP_API_AUTH_LOGIN +
				process.env.REACT_APP_API_AUTH_ID +
				process.env.REACT_APP_API_AUTH_KEY;
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					email: pars.Email,
					password: pars.Password,
					returnSecureToken: true,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				cache: "no-cache",
				redirect: "follow",
				referrerPolicy: "no-referrer",
			});
			const body = await response.json();
			if (response.ok) {
				dispatch(setLogin(body));
				dispatch(addInfo({ message: "User logged in." }));
			} else {
				cleanKeys();
				switch (body.error.message) {
					case "EMAIL_NOT_FOUND":
						throw new Error("Incorrect Credentials");
					case "INVALID_PASSWORD":
						throw new Error("Incorrect Credentials");
					case "USER_DISABLED":
						throw new Error("User Disabled");
					default:
						throw new Error(body.error.message);
				}
			}
		} catch (error) {
			cleanKeys();
			dispatch(addError({ message: error.message }));
		}
	};
};

export const changePassword = (pars) => {
	return async (dispatch, getState) => {
		try {
			const stateBefore = getState();
			const url =
				process.env.REACT_APP_API_AUTH_URL +
				process.env.REACT_APP_API_AUTH_PASSWORD +
				process.env.REACT_APP_API_AUTH_ID +
				process.env.REACT_APP_API_AUTH_KEY;
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					idToken: stateBefore.auth.token,
					password: pars.NewPassword,
					returnSecureToken: true,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				cache: "no-cache",
				redirect: "follow",
				referrerPolicy: "no-referrer",
			});
			const body = await response.json();
			if (response.ok) {
				dispatch(setLogin(body));
				dispatch(addInfo({ message: "Password changed." }));
			} else {
				switch (body.error.message) {
					case "WEAK_PASSWORD":
						throw new Error("Password is too weak");
					case "INVALID_ID_TOKEN":
						throw new Error("Incorrect Credentials");
					default:
						throw new Error(body.error.message);
				}
			}
		} catch (error) {
			dispatch(addError({ message: error.message }));
		}
	};
};

export const { setLogin, setLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
