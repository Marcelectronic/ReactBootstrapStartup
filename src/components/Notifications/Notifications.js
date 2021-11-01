import Notification from "../../UI/Notification/Notification";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const Notifications = () => {
	const notificationList = useSelector(
		(state) => state.notification.notificationList
	);

	if (notificationList.length > 0)
		return (
			<Fragment>
				{notificationList.map((item, index) => (
					<Notification
						key={item.id}
						ident={item.id}
						message={item.message}
						type={item.type}
					></Notification>
				))}
			</Fragment>
		);
	else return null;
};

export default Notifications;
