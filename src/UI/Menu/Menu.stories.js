import React from "react";
import Menu from "./Menu";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { setLogin, setLogout } from "../../store/Authentication";

export default {
	title: "UI/Menu",
	component: Menu,
	decorators: [
		(Story) => (
			<Provider store={store}>
				<BrowserRouter>
					<Story />
				</BrowserRouter>
			</Provider>
		),
	],
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => {
	const dispatch = useDispatch();
	if (args.login)
		dispatch(setLogin({ expiresIn: 10000, idToken: "skjvusgswjgsg" }));
	else dispatch(setLogout());
	return <Menu></Menu>;
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
	login: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
	login: false,
};
