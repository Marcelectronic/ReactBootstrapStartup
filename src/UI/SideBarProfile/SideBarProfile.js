import { Link } from "react-router-dom";

const SideBarProfile = () => {
	return (
		<div className="card text-white bg-secondary mb-3">
			<div className="card-header h5">Profile</div>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">My Info</li>
				<li className="list-group-item">
					<Link to="/change-password">Change Password</Link>
				</li>
				<li className="list-group-item">Notifications</li>
			</ul>
		</div>
	);
};

export default SideBarProfile;
