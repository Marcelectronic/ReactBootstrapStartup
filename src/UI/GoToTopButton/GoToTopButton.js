import { TiArrowUpOutline } from "react-icons/ti";
import { createPortal } from "react-dom";
import { Fragment } from "react";
import { useState, useCallback, useEffect } from "react";


const GoToTopButton = (props) => {
	const [showBacktoTop, setshowBacktoTop] = useState(false);

	const backToTop = () => {
		window.scrollTo(0, 0);
	};

	const handleBackToTop = useCallback(() => {
		if (window.pageYOffset > 200) {
			setshowBacktoTop(true);
		} else {
			setshowBacktoTop(false);
		}
	}, []);

	const cleanUp = useCallback(() => {
		window.removeEventListener("scroll", handleBackToTop);
	}, [handleBackToTop]);

	useEffect(() => {
		window.addEventListener("scroll", handleBackToTop);
		return cleanUp;
	}, [handleBackToTop, cleanUp]);

	return showBacktoTop ? (
		<Fragment>
			{createPortal(
				<button onClick={backToTop} className="btn btn-warning back-to-top">
					<TiArrowUpOutline size={25} />
				</button>,
				document.getElementById("backbutton")
			)}
		</Fragment>
	) : null;
};

export default GoToTopButton;
