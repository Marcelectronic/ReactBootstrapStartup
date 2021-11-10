const emailValidation = (value) => {
	const pattern =
		/^(([^<>()[\]\\.,;:\s@"”_]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@([^<>()[\]\\.,;:\s@"”_-])(^[-](\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (pattern.test(value.trim())) return null;
	return "Email format is incorrect";
};

const passwordValidation = (value) => {
	const pattern = /^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	if (pattern.test(value.trim())) return null;
	return "Password must be at least 8 characters, upper and lower case";
};

const textValidation = (min, value) => {
	if (value.trim().length >= min) return null;
	return "Field must be greater than " + min;
};

const backToTop = () => {
	window.scrollTo(0, 0);
};

export { emailValidation, passwordValidation, textValidation, backToTop };
