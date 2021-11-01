import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBarHome = () => {
	const islogin = useSelector((state) => state.auth.loggedIn);
	return (
		<div className="card">
			<div className="card-header h5">Side Bar</div>
			<div className="card-body">
				<h5 className="card-title">Optional Sidebar</h5>
				<p className="card-text">Sidebar for menu options or information</p>
				{islogin ? (
					<Link className="btn btn-primary" to="/profile">
						Go to profile
					</Link>
				) : (
					<Link className="btn btn-primary" to="/login">
						Go to Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default SideBarHome;
