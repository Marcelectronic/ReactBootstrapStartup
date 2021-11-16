import classes from "./Home.module.css";

const Home = () => {
	return (
		<div className={"flex flex-column w-100 mx-0 px-0 " + classes.base}>
			<h3>React Startup Setup</h3>
			<div className="my-3">
				Includes,
				<div>
					<ul>
						<li>Notifications System with Animation.</li>
						<li>Responsive Bootstrap UI.</li>
						<li>Authentication.</li>
						<li>Auto Logout.</li>
						<li>Forms validation Custom Hook.</li>
						<li>Fetch Rest API Custom Hook.</li>
						<li>Datatable with pagination and search.</li>
						<li>Basic Layout with Menu,Sidebar, Footer, Pages.</li>
						<li>Modals.</li>
						<li>Back to top button.</li>
					</ul>
				</div>
			</div>
			<div className="">
				The setup is using,
				<div>
					<ul>
						<li>React 17.0.2</li>
						<li>React Redux 7.2.5</li>
						<li>Redux Toolkit 1.6.2</li>
						<li>React Bootstrap 2.0.0-rc.1</li>
						<li>Bootstrap 5.1.3</li>
						<li>React Icons 4.3.1</li>
						<li>React Router Dom 5.3.0</li>
						<li>React Table 7.7.0</li>
						<li>React Transition Group 4.4.2</li>
						<li>CSS Modules</li>
					</ul>
				</div>
			</div>
			<div className="">
				As a backend for the authentication is using Firebase (Rest API)
				<br />
				can be easily adjusted to any RestAPI Compatible Backend.
			</div>
			<br />
			<div className="">
				to run needs the following enviroment variables,
				<ul>
					<li> REACT_APP_API_URL=https://???.firebaseio.com</li>
					<li> REACT_APP_COMPANY_NAME=???</li>
					<li>
						REACT_APP_API_AUTH_URL=https://identitytoolkit.googleapis.com/v1/accounts:
					</li>
					<li> REACT_APP_API_AUTH_LOGIN=signInWithPassword</li>
					<li> REACT_APP_API_AUTH_PASSWORD=update</li>
					<li> REACT_APP_API_AUTH_ID=?key=</li>
					<li> REACT_APP_API_AUTH_KEY=???</li>
				</ul>
			</div>
			<div className="">
				To start using the project just edit the following file(s),
				<ul>
					<li> app.js - Routes</li>
					<li>UI/Men/Menu.js - Menu Links</li>
					<li>pages/ - Directory for pages</li>
					<li>components/ - Directory for components</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
