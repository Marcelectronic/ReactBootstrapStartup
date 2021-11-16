import {
	render,
	screen,
	fireEvent,
	waitForElementToBeRemoved,
} from "../../utilities/testProvidersUtilities";
import Notification from "./Notification";

describe("UI Elements", () => {
	test("Error Notification with click", async () => {
		const pars = {
			ident: 1,
			type: "danger",
			message: "Testing app base",
			autoclose: false,
			duration: 700,
		};

		render(<Notification {...pars}></Notification>);

		 const element = screen.queryByText(/Testing app base/i);
		 expect(element).toBeInTheDocument();

		 const buttonElement = screen.getByRole("button");
		 fireEvent.click(buttonElement);

		await waitForElementToBeRemoved(() => screen.queryByText(/Testing app base/i),{timeout:2000})

	}, 7000);

	test("Error Notification without click", async () => {
		const pars = {
			ident: 1,
			type: "secondary",
			message: "Testing app base",
			autoclose: true,
			duration: 700,
            timeout: 2000
		};

		render(<Notification {...pars}></Notification>);

		const element = screen.queryByText(/Testing app base/i);
		expect(element).toBeInTheDocument();

		await waitForElementToBeRemoved(() => screen.queryByText(/Testing app base/i),{timeout:4000})

	}, 7000);
});
