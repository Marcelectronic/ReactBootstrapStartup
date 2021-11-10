import React from "react";
import SideBarProfile from "./SideBarProfile";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default {
	title: "UI/SideBarProfile",
	component: SideBarProfile,
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
	return <SideBarProfile></SideBarProfile>;
};

export const Base = Template.bind({});
Base.args = {

};

