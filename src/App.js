import "./App.css";
import MenuSection from "./layout/MenuSection/MenuSection";
import MainSection from "./layout/MainSection/MainSection";
import FooterSection from "./layout/FooterSection/FooterSection";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Stack } from "react-bootstrap";
import { setLogout } from "./store/Authentication";
import { addInfo } from "./store/Notification.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import GoToTopButton from "./UI/GoToTopButton/GoToTopButton";

function App() {
	const dispatch = useDispatch();
	const islogin = useSelector((state) => state.auth.loggedIn);
	const expirationTime = useSelector((state) => state.auth.expiration);

	useEffect(() => {
		const diff = expirationTime - new Date().getTime();
		if (islogin && diff > 0) {
			const timeoutID = setTimeout(() => {
				dispatch(addInfo({ message: "Logged Out - Timeout" }));
				dispatch(setLogout());
			}, diff);
			return () => {
				clearTimeout(timeoutID);
			};
		}
	}, [dispatch, islogin, expirationTime]);

	return (
		<Stack>
			<MenuSection></MenuSection>
			<Container fluid className="g-0 ">
				<MainSection></MainSection>
			</Container>
			<FooterSection></FooterSection>
			<GoToTopButton></GoToTopButton>
		</Stack>
	);
}

export default App;
