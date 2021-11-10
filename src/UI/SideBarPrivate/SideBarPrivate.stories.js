import React from "react";
import SideBarPrivate from "./SideBarPrivate";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default {
	title: "UI/SideBarPrivate",
	component: SideBarPrivate,
	decorators: [
		(Story) => (
				<BrowserRouter>
					<Story />
				</BrowserRouter>
		),
	],
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => {
	return <SideBarPrivate></SideBarPrivate>;
};

export const Base = Template.bind({});
Base.args = {

};

