import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
	const login = useSelector((state) => state.auth.loggedIn);

	return login ? (
		<Route path={props.path}>{props.children}</Route>
	) : (
		<Redirect to="/login" />
	);
};

export default PrivateRoute;
