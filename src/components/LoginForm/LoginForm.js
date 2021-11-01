import useValidateForm from "../../hooks/useValidateForm/useValidateForm";
import { Fragment } from "react";
import {
	emailValidation,
	passwordValidation,
} from "../../utilities/validations";
import { useDispatch } from "react-redux";
import { login } from "../../store/Authentication";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginForm = () => {
	const dispatch = useDispatch();
	const islogin = useSelector((state) => state.auth.loggedIn);

	const formInvalid = () => {
		window.scrollTo(0, 0);
	};
	const formValid = (values) => {
		window.scrollTo(0, 0);
		dispatch(login(values));
	};

	const FormInit = {
		data: { Email: "", Password: "" },
		validate: { Email: emailValidation, Password: passwordValidation },
		defaultClass: { Email: "form-control", Password: "form-control" },
		errorClass: { Email: "is-invalid", Password: "is-invalid" },
		okClass: { Email: "is-valid", Password: "is-valid" },
		formDefaultClass: "col-11 col-sm-10 col-md-8 col-lg-6 border p-3 mb-5",
		formErrorClass: "border-danger",
		submitDefaultClass: "btn btn-primary",
		submitErrorClass: "btn-disabled",
		isSubmitDisabled: false,
		invalidForm: formInvalid,
		validForm: formValid,
	};

	const formStatus = useValidateForm(FormInit);

	if (islogin) return <Redirect to="/" />;

	return (
		<Fragment>
			<form className={formStatus.formClass}>
				<h2 className="mb-3">Please Login</h2>
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
					<div className="invalid-feedback">{formStatus.inputError.Email}</div>
				</div>
				<div className="mb-3">
					<label htmlFor="Password" className="form-label">
						Password
					</label>
					<input
						name="Password"
						type="password"
						value={formStatus.input.Password}
						onChange={formStatus.inputChangeHandler}
						onBlur={formStatus.inputBlurHandler}
						className={formStatus.classes.Password}
					/>
					<div className="invalid-feedback">
						{formStatus.inputError.Password}
					</div>
				</div>
				<div className="mb-3">
					<button
						type="submit"
						onClick={formStatus.submitFormHandler}
						className={formStatus.submitClass}
						disabled={formStatus.submitDisabled}
					>
						Login
					</button>

					<button onClick={formStatus.reset} className="btn btn-secondary ms-1">
						Reset
					</button>
					<div className="invalid-feedback d-block">{formStatus.formError}</div>
				</div>
			</form>
		</Fragment>
	);
};

export default LoginForm;
