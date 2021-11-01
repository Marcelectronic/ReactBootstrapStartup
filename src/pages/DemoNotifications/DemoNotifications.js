import { useDispatch } from "react-redux";
import { addError, addInfo } from "../../store/Notification";

const DemoNotifications = () => {
	const dispatch = useDispatch();

	const errorHandler = () => {
		dispatch(addError({ message: "My new error" }));
	};

	const infoHandler = () => {
		dispatch(addInfo({ message: "My new info" }));
	};

	return (
		<div>
			<h3>Notifications</h3>
			<div className="mb-4">
				Click the buttons to add notifications manually.
			</div>
			<div>
				<button className="btn btn-primary me-4" onClick={errorHandler}>
					Add Error
				</button>
				<button className="btn btn-primary" onClick={infoHandler}>
					Add Info
				</button>
			</div>
		</div>
	);
};

export default DemoNotifications;
