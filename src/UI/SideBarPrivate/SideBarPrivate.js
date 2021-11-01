import { Link } from "react-router-dom";

const SideBarPrivate = () => {
	return (
		<div className="card text-white bg-warning mb-3 ">
			<div className="card-header h5">Side Bar</div>
			<div className="card-body bg-white text-black ">
				<h5 className="card-title">Private Sidebar</h5>
				<p className="card-text">Only logged in users</p>
				<Link className="btn btn-warning" to="/contact">
					Go to Contact
				</Link>
			</div>
		</div>
	);
};

export default SideBarPrivate;
