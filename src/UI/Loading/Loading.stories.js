import React from "react";
import Loading from "./Loading";


export default {
    title: "UI/Loading",
	component: Loading,
}

const Template = (args) => {
	return <Loading {...args}></Loading>;
};

export const Base = Template.bind({});
Base.args = {
    message:"Test Message"
};

Base.storyName = 'Test Message';
