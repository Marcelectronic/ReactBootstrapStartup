import { render, screen } from "../../utilities/testProvidersUtilities";
import Menu from "./Menu";
import { login } from "../../store/Authentication";
import store from "../../store";
import { server } from "../../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("UI Elements", () => {
	test("Menu Not Loggged", () => {
		//Arrange
		render(<Menu></Menu>);

		//Assert
		let element = screen.getByText(/home/i);
		expect(element).toBeInTheDocument();

		element = screen.getByText(/login/i);
		expect(element).toBeInTheDocument();

		element = screen.queryByText(/notifications/i);
		expect(element).not.toBeInTheDocument();

		element = screen.queryByText(/modal/i);
		expect(element).not.toBeInTheDocument();

		element = screen.queryByText(/postform/i);
		expect(element).not.toBeInTheDocument();

		element = screen.queryByText(/fetchdata/i);
		expect(element).not.toBeInTheDocument();

		element = screen.queryByText(/profile/i);
		expect(element).not.toBeInTheDocument();

		element = screen.queryByText(/logout/i);
		expect(element).not.toBeInTheDocument();
	});

	test("Menu Loggged In", async () => {

		await store.dispatch(
			login({ Email: "dummyemail@email.test", Password: "dummypassword" })
		);

		render(<Menu></Menu>, { state: store.getState(), store: store });

		//Assert
		let element = screen.getByText(/home/i);
		expect(element).toBeInTheDocument();

		element = screen.queryByText(/login/i);
		expect(element).not.toBeInTheDocument();

		element = screen.queryByText(/notifications/i);
		expect(element).toBeInTheDocument();

		element = screen.queryByText(/modal/i);
		expect(element).toBeInTheDocument();

		element = screen.queryByText(/postform/i);
		expect(element).toBeInTheDocument();

		element = screen.queryByText(/fetchdata/i);
		expect(element).toBeInTheDocument();

		element = screen.queryByText(/profile/i);
		expect(element).toBeInTheDocument();

		element = screen.queryByText(/logout/i);
		expect(element).toBeInTheDocument();
	});
});
