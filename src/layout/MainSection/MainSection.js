import classes from "./MainSection.module.css";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Home from "../../pages/Home/Home";
import DemoNotifications from "../../pages/DemoNotifications/DemoNotifications";
import DemoModal from "../../pages/DemoModal/DemoModal";
import Login from "../../pages/Login/Login";
import Contact from "../../pages/Contact/Contact";
import Notifications from "../../components/Notifications/Notifications";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import SideBarWrapper from "../../UI/SideBarWrapper/SideBarWrapper";
import SideBarHome from "../../UI/SideBarHome/SideBarHome";
import SideBarPrivate from "../../UI/SideBarPrivate/SideBarPrivate";
import SideBarProfile from "../../UI/SideBarProfile/SideBarProfile";
import Profile from "../../pages/Profile/Profile";
import ChangePassword from "../../pages/ChangePassword/ChangePassword";
import ListData from "../../pages/ListData/ListData";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const MainSection = (props) => {
	return <main className={"pt-4 mb-4 " + classes.main}>
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
									<SideBarWrapper>
										<SideBarHome></SideBarHome>
									</SideBarWrapper>
								</Route>
								<PrivateRoute path="/:path(list)">
									<SideBarWrapper>
										<SideBarPrivate></SideBarPrivate>
									</SideBarWrapper>
								</PrivateRoute>
								<PrivateRoute path="/:path(profile|change-password)">
									<SideBarWrapper>
										<SideBarProfile></SideBarProfile>
									</SideBarWrapper>
								</PrivateRoute>
							</Switch>
						</section>
					</div>
	</main>;
};

export default MainSection;
