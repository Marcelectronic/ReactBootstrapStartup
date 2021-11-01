import "./App.css";
import MenuSection from "./layout/MenuSection/MenuSection";
import MainSection from "./layout/MainSection/MainSection";
import FooterSection from "./layout/FooterSection/FooterSection";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Home from "./pages/Home/Home";
import DemoNotifications from "./pages/DemoNotifications/DemoNotifications";
import DemoModal from "./pages/DemoModal/DemoModal";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Stack } from "react-bootstrap";
import Notifications from "./components/Notifications/Notifications";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { setLogout } from "./store/Authentication";
import { addInfo } from "./store/Notification.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SideBarProvider from "./components/SideBarProvider/SideBarProvider";
import SideBarHome from "./UI/SideBarHome/SideBarHome";
import SideBarPrivate from "./UI/SideBarPrivate/SideBarPrivate";
import SideBarProfile from "./UI/SideBarProfile/SideBarProfile";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ListData from "./pages/ListData/ListData";
import GoToTopButton from "./UI/GoToTopButton/GoToTopButton";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

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
			return clearTimeout(timeoutID);
		}
	}, [dispatch, islogin, expirationTime]);

	return (
		<Stack>
			<MenuSection></MenuSection>
			<Container fluid className="g-0 ">
				<MainSection>
					<div className="w-100 m-0 p-0 d-flex flex-column justify-content-center flex-md-row justify-content-md-start">
						<section className="flex-grow-1 px-3 order-1 order-md-0 d-flex flex-column justify-content-start align-items-center">
							<Notifications></Notifications>
							<ScrollToTop></ScrollToTop>
							<Switch>
								<Route path="/" exact>
									<Home></Home>
								</Route>
								<PrivateRoute path="/demonotifications">
									<DemoNotifications></DemoNotifications>
								</PrivateRoute>
								<PrivateRoute path="/demomodal">
									<DemoModal></DemoModal>
								</PrivateRoute>
								<PrivateRoute path="/contact">
									<Contact></Contact>
								</PrivateRoute>
								<PrivateRoute path="/list">
									<ListData></ListData>
								</PrivateRoute>
								<PrivateRoute path="/profile">
									<Profile></Profile>
								</PrivateRoute>
								<PrivateRoute path="/change-password">
									<ChangePassword></ChangePassword>
								</PrivateRoute>
								<Route path="/login">
									<Login></Login>
								</Route>
								<Route path="*">
									<PageNotFound></PageNotFound>
								</Route>
							</Switch>
						</section>
						<section className="flex-grow-1 flex-md-grow-0 d-flex flex-column justify-content-start align-items-center">
							<Switch>
								<Route path="/" exact>
									<SideBarProvider>
										<SideBarHome></SideBarHome>
									</SideBarProvider>
								</Route>
								<PrivateRoute path="/:path(list)">
									<SideBarProvider>
										<SideBarPrivate></SideBarPrivate>
									</SideBarProvider>
								</PrivateRoute>
								<PrivateRoute path="/:path(profile|change-password)">
									<SideBarProvider>
										<SideBarProfile></SideBarProfile>
									</SideBarProvider>
								</PrivateRoute>
							</Switch>
						</section>
					</div>
				</MainSection>
			</Container>
			<FooterSection></FooterSection>
			<GoToTopButton></GoToTopButton>
		</Stack>
	);
}

export default App;
