import classes from "./SideBarWrapper.module.css";

const SideBarWrapper = (props) => {
	return (
		<section
			className={
				"mb-2 mb-md-0 me-md-2 sidebar order-0 order-md-1 " +
				classes.sidebar
			}
		>
			{props.children}
		</section>
	);
};

export default SideBarWrapper;
