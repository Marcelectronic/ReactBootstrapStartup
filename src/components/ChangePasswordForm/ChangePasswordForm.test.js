import ChangePasswordForm from "./ChangePasswordForm";
import { render, screen } from "../../utilities/testProvidersUtilities";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { login } from "../../store/Authentication";
import store from "../../store";
import userEvent from "@testing-library/user-event";

const urlChangePassword =
	process.env.REACT_APP_API_AUTH_URL + process.env.REACT_APP_API_AUTH_PASSWORD;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Components", () => {
	test("ChangePasswordForm empty", async () => {
		await store.dispatch(
			login({ Email: "dummyemail@email.test", Password: "dummypassword" })
		);

		render(<ChangePasswordForm></ChangePasswordForm>, {
			state: store.getState(),
			store: store,
		});

		const password = screen.getByLabelText(/New Password/i);
		expect(password).toBeEmptyDOMElement();

		const confirmation = screen.getByLabelText(/Repeat Password/i);
		expect(confirmation).toBeEmptyDOMElement();
	});

	test("ChangePasswordForm reset", async () => {
		await store.dispatch(
			login({ Email: "dummyemail@email.test", Password: "dummypassword" })
		);

		render(<ChangePasswordForm></ChangePasswordForm>, {
			state: store.getState(),
			store: store,
		});

		const password = screen.getByLabelText(/New Password/i, {
			selector: "input",
		});
		userEvent.clear(password);
		userEvent.type(password, "NewPasswordTest");

		const confirmation = screen.getByLabelText(/Repeat Password/i, {
			selector: "input",
		});
		userEvent.clear(confirmation);
		userEvent.type(confirmation, "NewPasswordTest");

		const resetBtn = screen.getByRole("button", { name: /Reset/i });
		userEvent.click(resetBtn);
		expect(password).not.toHaveValue();
		expect(confirmation).not.toHaveValue();
	});

	test("ChangePasswordForm incorrect confirmation", async () => {
		window.scrollTo = () => {};

		await store.dispatch(
			login({ Email: "dummyemail@email.test", Password: "dummypassword" })
		);

		render(<ChangePasswordForm></ChangePasswordForm>, {
			state: store.getState(),
			store: store,
		});

		const errorMsgBefore = screen.queryByText(/Form is invalid/i);
		expect(errorMsgBefore).not.toBeInTheDocument();

		const password = screen.getByLabelText(/New Password/i, {
			selector: "input",
		});
		userEvent.clear(password);
		userEvent.type(password, "NewPasswordTest");
		const confirmation = screen.getByLabelText(/Repeat Password/i, {
			selector: "input",
		});
		userEvent.clear(confirmation);
		userEvent.type(confirmation, "WrongConfirmation");

		const errorMsgAfter = screen.queryByText(
			/Form is invalid. New Password and Repeat Password must be equal/i
		);
		expect(errorMsgAfter).toBeInTheDocument();

		const changeBtn = screen.getByRole("button", { name: /Change/i });
		userEvent.click(changeBtn);

		const passwordAfter = screen.getByLabelText(/New Password/i, {
			selector: "input",
		});
		expect(passwordAfter).toHaveValue("NewPasswordTest");
		const confirmationAfter = screen.getByLabelText(/Repeat Password/i, {
			selector: "input",
		});
		expect(confirmationAfter).toHaveValue("WrongConfirmation");

		const errorMsgAfterClick = screen.queryByText(/Form is invalid/i);
		expect(errorMsgAfterClick).toBeInTheDocument();
	});

	test("ChangePasswordForm invalid password", async () => {
		window.scrollTo = () => {};

		await store.dispatch(
			login({ Email: "dummyemail@email.test", Password: "dummypassword" })
		);

		render(<ChangePasswordForm></ChangePasswordForm>, {
			state: store.getState(),
			store: store,
		});

		const errorMsgBefore = screen.queryByText(/Form is invalid/i);
		expect(errorMsgBefore).not.toBeInTheDocument();

		const password = screen.getByLabelText(/New Password/i, {
			selector: "input",
		});
		userEvent.clear(password);
		userEvent.type(password, "newpas");
		userEvent.tab();

		const errorMsgAfter1 = screen.getByText(
			/Password must be at least 8 characters, upper and lower case/i,
			{ exact: false }
		);
		expect(errorMsgAfter1).toBeInTheDocument();

		const confirmation = screen.getByLabelText(/Repeat Password/i, {
			selector: "input",
		});
		userEvent.clear(confirmation);
		userEvent.type(confirmation, "newpas");
		userEvent.tab();

		const errorMsgAfter2 = screen.getAllByText(
			/Password must be at least 8 characters, upper and lower case/i
		);
		expect(errorMsgAfter2.length).toBe(2);

		const changeBtn = screen.getByRole("button", { name: /Change/i });
		userEvent.click(changeBtn);

		const passwordAfter = screen.getByLabelText(/New Password/i, {
			selector: "input",
		});
		expect(passwordAfter).toHaveValue("newpas");

		const confirmationAfter = screen.getByLabelText(/Repeat Password/i, {
			selector: "input",
		});
		expect(confirmationAfter).toHaveValue("newpas");

		const errorMsgAfterClick = screen.queryByText(/Form is invalid/i);
		expect(errorMsgAfterClick).toBeInTheDocument();
	});

	test("ChangePasswordForm valid password", async () => {
		window.scrollTo = () => {};

		await store.dispatch(
			login({ Email: "dummyemail@email.test", Password: "dummypassword" })
		);

		render(<ChangePasswordForm></ChangePasswordForm>, {
			state: store.getState(),
			store: store,
		});

		const errorMsgBefore = screen.queryByText(/Form is invalid/i);
		expect(errorMsgBefore).not.toBeInTheDocument();

		const password = screen.getByLabelText(/New Password/i, {
			selector: "input",
		});
		userEvent.clear(password);
		userEvent.type(password, "NewPasswordTest");
		userEvent.tab();

		const errorMsgAfter1 = screen.queryByText(
			/Password must be at least 8 characters, upper and lower case/i,
			{ exact: false }
		);
		expect(errorMsgAfter1).not.toBeInTheDocument();

		const confirmation = screen.getByLabelText(/Repeat Password/i, {
			selector: "input",
		});
		userEvent.clear(confirmation);
		userEvent.type(confirmation, "NewPasswordTest");
		userEvent.tab();

		const errorMsgAfter2 = screen.queryByText(
			/Password must be at least 8 characters, upper and lower case/i
		);
		expect(errorMsgAfter2).not.toBeInTheDocument();

		const errorMsgBeforeClick = screen.queryByText(/Form is invalid/i);
		expect(errorMsgBeforeClick).not.toBeInTheDocument();

		const changeBtn = screen.getByRole("button", { name: /Change/i });
		userEvent.click(changeBtn);

		const errorMsgAfterClick = screen.queryByText(/Form is invalid/i);
		expect(errorMsgAfterClick).not.toBeInTheDocument();
	}, 7000);

	test("ChangePasswordForm Server Error", async () => {
		window.scrollTo = () => {};

		await store.dispatch(
			login({ Email: "dummyemail@email.test", Password: "dummypassword" })
		);

		render(<ChangePasswordForm></ChangePasswordForm>, {
			state: store.getState(),
			store: store,
		});

		server.use(
			rest.post(urlChangePassword, (req, res, ctx) => {
				return res(
					ctx.status(400),
					ctx.json({
						error: {
							code: 400,
							message: "CREDENTIAL_TOO_OLD_LOGIN_AGAIN",
							errors: [
								{
									message: "CREDENTIAL_TOO_OLD_LOGIN_AGAIN",
									domain: "global",
									reason: "invalid",
								},
							],
						},
					})
				);
			})
		);

		const password = screen.getByLabelText(/New Password/i, {
			selector: "input",
		});
		userEvent.clear(password);
		userEvent.type(password, "NewPasswordTest");
		userEvent.tab();

		const confirmation = screen.getByLabelText(/Repeat Password/i, {
			selector: "input",
		});
		userEvent.clear(confirmation);
		userEvent.type(confirmation, "NewPasswordTest");
		userEvent.tab();

		const errorMsgBeforeClick = screen.queryByText(/Form is invalid/i);
		expect(errorMsgBeforeClick).not.toBeInTheDocument();

		const changeBtn = screen.getByRole("button", { name: /Change/i });
		userEvent.click(changeBtn);
	}, 7000);
});
