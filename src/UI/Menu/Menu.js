import { Navbar, Container, Nav } from "react-bootstrap";
import { DiAtom } from "react-icons/di";
import { NavLink } from "react-router-dom";
import classes from "./Menu.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Authentication";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Menu = () => {
	const login = useSelector((state) => state.auth.loggedIn);
	const dispatch = useDispatch();
	const [toggleMenu, settoggleMenu] = useState(false);
	const history = useHistory();

	const handleLogout = () => {
		settoggleMenu(false);
		dispatch(logout());
	};

	const onSelectHandler = (props) => {
		if (props !== "Home") history.push("/" + props);
		else history.push("/");

		if (toggleMenu) settoggleMenu(false);
	};

	const onToggleHandler = () => {
		settoggleMenu(() => !toggleMenu);
	};

	return (
		<Navbar
			bg="primary"
			variant="dark"
			fixed="top"
			expand="md"
			expanded={toggleMenu}
			onSelect={onSelectHandler}
			onToggle={onToggleHandler}
		>
			<Container>
				<Navbar.Brand>
					<NavLink to="/" className={"nav-link p-0 m-0" + classes.nav} exact>
						<DiAtom size={40} color="white" />
					</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Item>
							<Nav.Link href="#" eventKey="Home">
								Home
							</Nav.Link>
						</Nav.Item>
						{login && (
							<Nav.Item>
								<Nav.Link href="#" eventKey="demonotifications">
									Notifications
								</Nav.Link>
							</Nav.Item>
						)}
						{login && (
							<Nav.Item>
								<Nav.Link href="#" eventKey="demomodal">
									Modal
								</Nav.Link>
							</Nav.Item>
						)}
						{login && (
							<Nav.Item>
								<Nav.Link href="#" eventKey="contact">
									PostForm
								</Nav.Link>
							</Nav.Item>
						)}
						{login && (
							<Nav.Item>
								<Nav.Link href="#" eventKey="list">
									FetchData
								</Nav.Link>
							</Nav.Item>
						)}
						{login && (
							<Nav.Item>
								<Nav.Link href="#" eventKey="profile">
									Profile
								</Nav.Link>
							</Nav.Item>
						)}
						{login ? (
							<button className="nav-link btn btn-link" onClick={handleLogout}>
								Logout
							</button>
						) : (
							<Nav.Item>
								<Nav.Link href="#" eventKey="login">
									Login
								</Nav.Link>
							</Nav.Item>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
