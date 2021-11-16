import useValidateForm from "../../hooks/useValidateForm/useValidateForm";
import { Fragment } from "react";
import { passwordValidation } from "../../utilities/validations";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/Authentication";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ChangePasswordForm = () => {
	const dispatch = useDispatch();
	const islogin = useSelector((state) => state.auth.loggedIn);

	const formInvalid = () => {
		window.scrollTo(0, 0);
	};
	const formValid = (values) => {
		window.scrollTo(0, 0);
		dispatch(changePassword(values));
	};

	const FormInit = {
		data: { NewPassword: "", CheckNewPassword: "" },
		validate: {
			NewPassword: passwordValidation,
			CheckNewPassword: passwordValidation,
		},
		defaultClass: {
			NewPassword: "form-control",
			CheckNewPassword: "form-control",
		},
		errorClass: { NewPassword: "is-invalid", CheckNewPassword: "is-invalid" },
		okClass: { NewPassword: "is-valid", CheckNewPassword: "is-valid" },
		formDefaultClass: "col-11 col-sm-10 col-md-8 col-lg-6 border p-3 mb-5",
		formErrorClass: "border-danger",
		submitDefaultClass: "btn btn-primary",
		submitErrorClass: "btn-disabled",
		isSubmitDisabled: false,
		invalidForm: formInvalid,
		validForm: formValid,
		validateEqual: {
			primary: "NewPassword",
			secondary: "CheckNewPassword",
			primaryText: "New Password",
			secondaryText: "Repeat Password",
		},
	};

	const formStatus = useValidateForm(FormInit);

	if (!islogin) return <Redirect to="/" />;

	return (
		<Fragment>
			<form className={formStatus.formClass}>
				<h2 className="mb-3">Change Password</h2>
				<div className="mb-3">
					<label htmlFor="NewPassword" className="form-label">
						New Password
					</label>
					<input
						name="NewPassword"
						id="NewPassword"
						type="password"
						maxLength="30"
						value={formStatus.input.NewPassword}
						onChange={formStatus.inputChangeHandler}
						onBlur={formStatus.inputBlurHandler}
						className={formStatus.classes.NewPassword}
					/>

					<div className="invalid-feedback">
						{formStatus.inputError.NewPassword}
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="CheckNewPassword" className="form-label">
						Repeat Password
					</label>
					<input
						name="CheckNewPassword"
						id="CheckNewPassword"
						type="password"
						value={formStatus.input.CheckNewPassword}
						onChange={formStatus.inputChangeHandler}
						onBlur={formStatus.inputBlurHandler}
						className={formStatus.classes.CheckNewPassword}
					/>
					<div className="invalid-feedback">
						{formStatus.inputError.CheckNewPassword}
					</div>
				</div>
				<div className="mb-3">
					<button
						type="submit"
						onClick={formStatus.submitFormHandler}
						className={formStatus.submitClass}
						disabled={formStatus.submitDisabled}
					>
						Change
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

export default ChangePasswordForm;
