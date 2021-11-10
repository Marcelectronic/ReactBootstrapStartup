import {
	render,
	screen,
	fireEvent,
} from "../../utilities/testProvidersUtilities";
import Notification from "./Notification";

function createCustomTimeout(timeout) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const element = screen.queryByText(/Testing app base/i);
			expect(element).not.toBeInTheDocument();
			resolve();
		}, timeout);
	});
}

describe("UI Elements", () => {
	test("Error Notification with click", async () => {
		const pars = {
			ident: 1,
			type: "danger",
			message: "Testing app base",
			autoclose: false,
			duration: 0,
		};

		render(<Notification {...pars}></Notification>);

		let element = screen.queryByText(/Testing app base/i);
		expect(element).toBeInTheDocument();

		const buttonElement = screen.getByRole("button");
		fireEvent.click(buttonElement);

		await createCustomTimeout(800);
	});

	test("Error Notification without click", async () => {
		const pars = {
			ident: 1,
			type: "secondary",
			message: "Testing app base",
			autoclose: true,
			duration: 0,
            timeout: 1000
		};

		render(<Notification {...pars}></Notification>);

		let element = screen.queryByText(/Testing app base/i);
		expect(element).toBeInTheDocument();

		const buttonElement = screen.getByRole("button");
		fireEvent.click(buttonElement);

		await createCustomTimeout(2000);
	}, 7000);
});
