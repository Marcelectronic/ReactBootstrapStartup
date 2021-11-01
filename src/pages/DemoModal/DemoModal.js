import ModalProvider from "../../components/ModalProvider/ModalProvider";
import { useState } from "react";

const DemoModal = () => {
	const [showModal, setShowModal] = useState(false);

	const modalOpenHandler = () => {
		setShowModal(true);
	};

	const modalCloseHandler = () => {
		setShowModal(false);
	};

	return (
		<div>
			<h3>Modals</h3>
			<div className="mb-4">Click the buttons to open a modal.</div>
			<button className="btn btn-primary" onClick={modalOpenHandler}>
				Open Modal
			</button>

			<ModalProvider
				showModal={showModal}
				closeHandler={modalCloseHandler}
				title="My Title"
				showSave={true}
				saveHandler={modalCloseHandler}
			>
				<div>My Modal</div>
			</ModalProvider>
		</div>
	);
};

export default DemoModal;
