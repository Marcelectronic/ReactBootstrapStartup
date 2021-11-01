import classes from "./MainSection.module.css";

const MainSection = (props) => {
	return <main className={"pt-4 mb-4 " + classes.main}>{props.children}</main>;
};

export default MainSection;
