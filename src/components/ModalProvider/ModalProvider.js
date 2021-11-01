import { Modal } from "react-bootstrap";

const ModalProvider = (props) => {
	if (props.showModal)
		return (
			<Modal show={props.showModal} onHide={props.closeHandler}>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<Modal.Footer>
					{props.showSave ? (
						<button
							onClick={props.saveHandler}
							className="btn btn-primary me-2"
						>
							Save
						</button>
					) : (
						""
					)}
					<button onClick={props.closeHandler} className="btn btn-secondary">
						Close
					</button>
				</Modal.Footer>
			</Modal>
		);
	else return null;
};

export default ModalProvider;
