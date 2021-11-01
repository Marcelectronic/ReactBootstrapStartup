import classes from "./SideBarProvider.module.css";

const SideBarProvider = (props) => {
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

export default SideBarProvider;
