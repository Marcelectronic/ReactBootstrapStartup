const Footer = () => {
	return (
		<div className="d-flex flex-row justify-content-around text-muted bg-dark">
			<span className="d-none d-md-block">{process.env.REACT_APP_COMPANY_NAME}</span>
			<span>Copyright© {new Date().getFullYear()} All Rights Reserved</span>
		</div>
	);
};

export default Footer;
