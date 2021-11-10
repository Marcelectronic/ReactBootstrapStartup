import React from "react";
import Notification from "./Notification";
import { Provider } from "react-redux";
import store from "../../store";

export default {
	title: "UI/Notification",
	component: Notification,
	argTypes: { onClick: { action: 'onClick' } },
	decorators: [
		(Story) => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
};

const Template = (args) => {
	return <Notification {...args}></Notification>;
};

export const Error = Template.bind({});
Error.args = {
	ident: 1,
	type: "danger",
	message: "Error",
	autoclose: false,
	duration: 700,
	timeout: 4000
};

export const Info = Template.bind({});
Info.args = {
	ident: 1,
	type: "secondary",
	message: "Info",
	autoclose: false,
	duration: 700,
	timeout: 4000
};
