import classes from "./PageNotFound.module.css";
import { GiMagnifyingGlass } from "react-icons/gi";

const PageNotFound = () => {
	return (
		<div className={classes.nofound}>
			<GiMagnifyingGlass size={40}/>
			<span className="ms-4 fs-2">Page Not Found</span>
		</div>
	);
};

export default PageNotFound;
