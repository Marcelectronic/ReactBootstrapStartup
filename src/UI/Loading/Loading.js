import classes from "./Loading.module.css";

const Loading = (props) => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center m-3">
			<div
				className={"spinner-border text-primary " + classes.loading}
				role="status"
			>
				<span className="visually-hidden">{props.message}</span>
			</div>
			<span className="text-primary m-1">{props.message}</span>
		</div>
	);
};
export default Loading;
