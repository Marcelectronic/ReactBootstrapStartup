import useValidateForm from "../../hooks/useValidateForm/useValidateForm";
import { Fragment } from "react";
import { emailValidation, textValidation } from "../../utilities/validations";
import classes from "./ContactForm.module.css";
import useFetchAPI from "../../hooks/useFetchAPI/useFetchAPI";
import Loading from "../../UI/Loading/Loading";
import { Prompt } from "react-router-dom";
import { useSelector } from "react-redux";

const ContactForm = () => {
	const token = useSelector((state) => state.auth.token);

	const parameters = {
		url: process.env.REACT_APP_API_URL + "/contacts.json?auth=" + token,
		method: "POST",
	};

	const { isloading, iserror, request } = useFetchAPI(
		parameters,
		(data) => data,
		true,
		"Form Submited successfully."
	);

	const formInvalid = () => {
		window.scrollTo(0, 0);
	};
	const formValid = (values) => {
		window.scrollTo(0, 0);
		request(values);
		if (!iserror) {
			formStatus.resetManual();
		}
	};

	const FormInit = {
		data: { Email: "", Subject: "", Message: "" },
		validate: {
			Email: emailValidation,
			Subject: textValidation.bind(null, 8),
			Message: textValidation.bind(null, 20),
		},
		defaultClass: {
			Email: "form-control",
			Subject: "form-control",
			Message: "form-control",
		},
		errorClass: {
			Email: "is-invalid",
			Subject: "is-invalid",
			Message: "is-invalid",
		},
		okClass: { Email: "is-valid", Subject: "is-valid", Message: "is-valid" },
		formDefaultClass:
			"col-11 col-sm-10 col-md-8 col-lg-6 border p-3 mb-5 " + classes.base,
		formErrorClass: "border-danger",
		submitDefaultClass: "btn btn-primary",
		submitErrorClass: "btn-disabled",
		isSubmitDisabled: false,
		invalidForm: formInvalid,
		validForm: formValid,
	};

	const formStatus = useValidateForm(FormInit);

	const isDirty = () => {
		return (
			formStatus.input.Email.length > 0 ||
			formStatus.input.Subject.length > 0 ||
			formStatus.input.Message.length > 0
		);
	};

	return (
		<Fragment>
			{isloading && !iserror && <Loading message="Loading"></Loading>}
			{!isloading && (
				<form className={formStatus.formClass}>
					<h2 className="mb-3">Post a Contact Form</h2>
					<div className="mb-3">
						<label htmlFor="Email" className="form-label">
							Email
						</label>
						<input
							name="Email"
							type="email"
							maxLength="30"
							value={formStatus.input.Email}
							onChange={formStatus.inputChangeHandler}
							onBlur={formStatus.inputBlurHandler}
							className={formStatus.classes.Email}
						/>
						<div className="form-text">
							We'll never share your email with anyone else.
						</div>
						<div className="invalid-feedback">
							{formStatus.inputError.Email}
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="Subject" className="form-label">
							Subject
						</label>
						<input
							name="Subject"
							type="Subject"
							value={formStatus.input.Subject}
							onChange={formStatus.inputChangeHandler}
							onBlur={formStatus.inputBlurHandler}
							className={formStatus.classes.Subject}
						/>
						<div className="invalid-feedback">
							{formStatus.inputError.Subject}
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="Message" className="form-label">
							Message
						</label>
						<textarea
							name="Message"
							type="Message"
							value={formStatus.input.Message}
							onChange={formStatus.inputChangeHandler}
							onBlur={formStatus.inputBlurHandler}
							className={formStatus.classes.Message}
							rows="6"
						/>
						<div className="invalid-feedback">
							{formStatus.inputError.Message}
						</div>
					</div>
					<div className="mb-3">
						<button
							type="submit"
							onClick={formStatus.submitFormHandler}
							className={formStatus.submitClass}
							disabled={formStatus.submitDisabled}
						>
							Submit
						</button>
						<button
							onClick={formStatus.reset}
							className="btn btn-secondary ms-1"
						>
							Reset
						</button>
						<div className="invalid-feedback d-block">
							{formStatus.formError}
						</div>
					</div>
					<Prompt when={isDirty()} message="Are you sure you want to leave?" />
				</form>
			)}
		</Fragment>
	);
};

export default ContactForm;
