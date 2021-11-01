import { useState } from "react";

const useValidateForm = (props) => {
	const [input, setInput] = useState(props.data);

	const populateBlur = (value) => {
		return Object.keys(props.data).reduce(
			(obj, item) => ({ ...obj, [item]: value }),
			{}
		);
	};

	const [inputblur, setInputblur] = useState(populateBlur(false));

	const inputdatavalid = Object.keys(props.data).reduce(
		(obj, item) => ({
			...obj,
			[item]: props.validate.hasOwnProperty([item])
				? props.validate[item](input[item])
				: "",
		}),
		{}
	);

	const inputError = Object.keys(props.data).reduce(
		(obj, item) => ({
			...obj,
			[item]: !!inputdatavalid[item] && inputblur[item] && (
				<div>{inputdatavalid[item]}</div>
			),
		}),
		{}
	);

	const inputclass = Object.keys(props.data).reduce(
		(obj, item) => ({
			...obj,
			[item]:
				props.defaultClass[item] +
				" " +
				(props.errorClass.hasOwnProperty([item]) && inputError[item]
					? props.errorClass[item]
					: inputblur[item]
					? props.okClass[item]
					: ""),
		}),
		{}
	);

	const validEqual = () => {
		if (props.validateEqual) {
			const val1 = input[props.validateEqual.primary];
			const val2 = input[props.validateEqual.secondary];
			if (val1 !== val2) {
				return false;
			} else return true;
		}
		return true;
	};
	const isEqual = validEqual();

	const formisInvalid =
		Object.values(inputError).reduce(
			(previousValue, currentValue) => previousValue || !!currentValue,
			false
		) || !isEqual;

	const formClass =
		props.formDefaultClass + " " + (formisInvalid ? props.formErrorClass : "");
	const submitClass =
		props.submitDefaultClass +
		" " +
		(formisInvalid ? props.submitErrorClass : "");

	const formError =
		formisInvalid &&
		"Form is invalid." +
			(!isEqual
				? ` ${props.validateEqual.primaryText} and ${props.validateEqual.secondaryText} must be equal`
				: "");

	const formDataCheck = Object.keys(props.data).reduce(
		(previousValue, item) =>
			previousValue ||
			(props.validate.hasOwnProperty([item])
				? props.validate[item](input[item])
				: false),
		false
	);

	const submitDisabled = props.isSubmitDisabled && formDataCheck && !isEqual;

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setInput((PrevState) => {
			return { ...PrevState, [name]: value };
		});
	};

	const inputBlurHandler = (event) => {
		const { name } = event.target;
		setInputblur((PrevState) => {
			return { ...PrevState, [name]: true };
		});
	};

	const submitformHandler = (event) => {
		event.preventDefault();
		setInputblur(populateBlur(true));

		if (formDataCheck || !isEqual) {
			props.invalidForm();
			return;
		}
		props.validForm(input);
	};

	const resetManual = () => {
		setInputblur(populateBlur(false));
		setInput(props.data);
	};

	const resetForm = (event) => {
		event.preventDefault();
		resetManual();
	};

	const par = {
		input: input,
		inputChangeHandler: inputChangeHandler,
		inputBlurHandler: inputBlurHandler,
		inputError: inputError,
		submitFormHandler: submitformHandler,
		formError: formError,
		classes: inputclass,
		formClass: formClass,
		submitClass: submitClass,
		submitDisabled: submitDisabled,
		reset: resetForm,
		resetManual: resetManual,
	};

	return par;
};

export default useValidateForm;
