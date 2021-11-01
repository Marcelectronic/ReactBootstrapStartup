import { Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../store/Notification";

const Notification = (props) => {
	const [show, setShow] = useState(true);
	const myref = useRef();
	const animationDuration = 700;
	const timeoutDuration = 4000;

	const dispatch = useDispatch();

	useEffect(() => {
		const timeId = setTimeout(() => {
			setShow(false);
		}, timeoutDuration);

		return () => {
			clearTimeout(timeId);
		};
	}, []);

	const removeState = () => {
		dispatch(removeNotification(props.ident));
	};

	const defaultStyle = {
		transition: `opacity ${animationDuration}ms ease-in-out`,
		opacity: 0,
	};

	const transitionStyles = {
		entering: { opacity: 0 },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0 },
	};

	return (
		<Transition
			in={show}
			timeout={animationDuration}
			mountOnEnter
			unmountOnExit
			nodeRef={myref}
			onExited={removeState}
		>
			{(state) => (
				<div
					ref={myref}
					className="w-100 px-0 px-sm-2 px-md-4 px-lg-5"
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					<Alert
						variant={props.type}
						onClose={() => setShow(false)}
						dismissible
					>
						{props.message}
					</Alert>
				</div>
			)}
		</Transition>
	);
};

export default Notification;
